export = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  synchronize: false,
  debug: false,
  // logging: ['query'],
  entities: ['src/entities/*.ts'],
  migrationsTableName: 'api_migration_table',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  subscribers: ['src/subscribers/*.ts'],
};
