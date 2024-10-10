import express, {Application} from 'express';
import cors from 'cors';
import logger from 'morgan';

import router from './routes/index.routes';
import {GlobalErrorHandler} from './middleware/error.middleware';
import './db/knex';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({limit: '20mb', extended: true}));

// Enables Cross-origin requests to server
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(router);
app.use(GlobalErrorHandler as unknown as Application);

export default app;
