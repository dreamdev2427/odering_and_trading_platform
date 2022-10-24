const { AsyncGenerator, loadRemoteSchema } = require('graphql-ts-client-codegen');
const path = require('path');

const generator = new AsyncGenerator({
  schemaLoader: async () => {
    return loadRemoteSchema(process.env.API_URL);
  },
  targetDir: path.join(__dirname, '../src/graphql'),
  scalarTypeMap: {
    JSON: 'object',
    Timestamp: 'number',
    Upload: 'object',
  }
});

generator.generate();
