import app from './app';
import serverConfig from './config/server';
import knex from './db/knex';

const {
  server: {port, name},
} = serverConfig;

app.listen(port, () => {
  console.log(`Listening to ${name} on port ${port}`);
});
