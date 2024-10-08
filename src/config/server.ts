import dotenv from 'dotenv';
dotenv.config();
const {NODE_ENV, PORT} = process.env;

const server = {
  NODE_ENV,
};
export default {
  enviroments: server,
  server: {
    id: 'wallet.service',
    port: PORT,
    name: 'Wallet API',
  },
};
