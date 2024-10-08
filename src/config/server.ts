import dotenv from 'dotenv';
dotenv.config();
const {NODE_ENV, PORT, DB_DIALECT, DB_URL, SECRET} = process.env;

const server = {
  NODE_ENV,
};
export default {
  enviroments: server,
  server: {
    id: 'wallet.service',
    port: PORT,
    name: 'Wallet API',
    secret: SECRET || '',
  },
  db: {
    client: DB_DIALECT,
    connectionUrl: DB_URL,
  },
};
