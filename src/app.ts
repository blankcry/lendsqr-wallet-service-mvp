import express, {Express} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './routes/index.routes';

const expressApp: Express = express();

expressApp.use(logger('dev'));

// Allows us to receive requests with data in json
// and x-www-form-urlencoded formats
expressApp.use(bodyParser.json({limit: '20mb'}));
expressApp.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

// Enables Cross-origin requests to server
expressApp.use(cors());

expressApp.use(router);

export default expressApp;
