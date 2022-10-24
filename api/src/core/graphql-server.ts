import fs from 'fs/promises';
import { exit } from 'process';
import { createServer, Server } from 'http';
import express, { Application } from 'express';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';
import { graphqlUploadExpress } from 'graphql-upload';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import jwt_decode from 'jwt-decode';

import { Params } from 'entities';
import { scheduledEmailNotification } from 'services/chat/notification';
import { PARAM } from 'core/envs';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLSchema } from 'graphql';
import * as wsCommon from 'graphql-ws/lib/common';
import authChecker from './auth-checker';
import { Context, User } from './context';

// global variable used to publish any events to the websocket
export const pubSub = new PubSub();

class GraphqlServer {
  readonly path: string = '/gql';

  readonly wsPath: string = '/gql';

  readonly app: Application;

  apollo?: ApolloServer;

  readonly config: ApolloServerExpressConfig;

  httpServer: Server;

  constructor(config: ApolloServerExpressConfig = {}) {
    this.app = express();

    this.useBodyParser();
    this.useJwt();

    this.config = config;
  }

  async useCors(): Promise<void> {
    const param = await Params.getParamOrFail(PARAM.WHITELISTED_CORS_URLS);
    let origin;
    try {
      origin = JSON.parse(param.stringValue);
    } catch {
      origin = param.stringValue;
    }
    this.app.use(cors({ origin }));
  }

  useJwt(): void {
    if (!process.env.PRIVATE_JWT_KEY) {
      throw new Error('set PRIVATE_JWT_KEY in .env file');
    }

    this.app.use(
      jwt({
        secret: process.env.PRIVATE_JWT_KEY,
        algorithms: ['HS256'],
        credentialsRequired: false,
      }),
    );
  }

  useBodyParser(): void {
    this.app.use(
      bodyParser.json({
        limit: 10000000,
        strict: false,
        // adding a rawBody so hashes are properly calculated for hook verification
        verify(req: any, res, buf) {
          if (req.url?.startsWith('/api/investorSumSubWebhookPost')) {
            if (buf && buf.length) {
              req.rawBody = buf.toString(); // additional property set on req object
            }
          }
        },
      }),
    );
  }

  useWS(schema: GraphQLSchema): wsCommon.Disposable {
    const wsServer = new WebSocketServer({
      server: this.httpServer,
      path: this.wsPath,
    });

    const getDynamicContext = async (ctx: any) => {
      if (ctx.connectionParams?.authorization) {
        const currentUser = jwt_decode(ctx.connectionParams.authorization) as User;
        return { user: currentUser };
      }
      return { currentUser: null };
    };
    return useServer(
      {
        schema,
        context: (ctx: any) => {
          return getDynamicContext(ctx);
        },
      },
      wsServer,
    );
  }

  async useApollo(resolvers: NonEmptyArray<Function>): Promise<void> {
    this.app.use(this.path, graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    const schema = await buildSchema({
      resolvers,
      authChecker,
      pubSub: pubSub,
    });

    try {
      this.httpServer = createServer(this.app);

      const serverCleanup = this.useWS(schema);
      const httpServer = this.httpServer;
      this.apollo = new ApolloServer({
        introspection: true,
        schema,
        validationRules: [depthLimit(10)],
        ...this.config,
        context({ req }): Context {
          return {
            user: req.user,
          } as Context;
        },
        plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer }),
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose();
                },
              };
            },
          },
        ],
      });

      await this.apollo.start();

      this.apollo.applyMiddleware({ app: this.app, path: this.path });
    } catch (error) {
      console.log(`❌  Something went wrong: \n ${error}`);
    }
  }

  async doMigrations(connection: Connection): Promise<void> {
    if (process.env.AUTOMIGRATE !== '0') {
      // WILL RUN BY DEFAULT UNLESS DISABLED
      if (await connection.showMigrations()) {
        console.log(`🔃 Running migrations...`);
      }
      // Do all or none of the migrations since it's hard to verify and print which ones have passed
      // If one bad migration is blocking you, you must fix it either way.
      try {
        const migrations = await connection.runMigrations({
          transaction: 'all',
        });
        if (migrations.length) {
          const names = migrations.map((m) => m.name);
          console.log(`💾 Executed migrations\n ✔ ${names.join(`\n ✔ `)}`);
        } else {
          console.log(`✅ Migrations already at latest`);
        }
      } catch (e) {
        console.error(e);
        console.error(
          `🚫 All new migrations were aborted and reverted.\n⛔ Exiting due to migration error.`,
        );
        exit(1);
      }
    }
  }

  async useOrm(): Promise<void> {
    const name = process.env.NODE_ENV === 'testing' ? 'testing' : 'default';
    const connection = await createConnection(name);
    await this.doMigrations(connection);
  }

  async useGCS(): Promise<void> {
    const file = 'ds-sa.json';
    try {
      await fs.access(file);
      return await Promise.resolve();
    } catch (e) {
      if (!process.env.GCS_SA) {
        throw new Error('provide GCS Service Account json in base64');
      }
      const buff = Buffer.from(process.env.GCS_SA, 'base64');

      await fs.writeFile(file, buff);
    }
  }

  async useStatic(): Promise<void> {
    this.app.use('/uploads', express.static('uploads'));
  }

  async useCron(): Promise<void> {
    await scheduledEmailNotification();
  }

  async start(resolvers: NonEmptyArray<Function>): Promise<void> {
    await this.useOrm();
    await this.useGCS();
    await this.useCors();
    await this.useStatic();
    await this.useCron();
    await this.useApollo(resolvers);

    const port = process.env.PORT || 3000;

    try {
      this.httpServer.listen({ port }, () => {
        console.log(`🚀 Server ready on port: ${port}`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${port}${this.wsPath}`);
        console.log(`🚀 Scheduled Email Notification is set up`);
      });
    } catch (error) {
      console.log(`❌  Something went wrong: \n ${error}`);
    }
  }
}

export default GraphqlServer;
