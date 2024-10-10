import Knex from 'knex';
import config from '../../config/server';

const {
  db: {client, connectionUrl},
} = config;

const knex = Knex({
  client,
  connection: connectionUrl,
  debug: true,
  migrations: {
    directory: './migrations',
    extension: 'ts', // Use TypeScript files for migrations
  },
});

export default knex;
