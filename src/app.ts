/** @format */

import helmet from 'helmet';
import express, { urlencoded } from 'express';
import morgan from 'morgan';
import CourseRoutes from './routes';
import authenticate from './middleware/authenticate';
import authorize from './middleware/authorizate';
import dotenv from 'dotenv';
import config from 'config';

dotenv.config(); //load environment variables from .env file

const app = express();

app.use(express.json()); //middleware

// process.env.NODE_ENV === 'production' ? app.use(helmet()) : null; //use helmet only in production
console.log('NODE_ENV: ' + process.env.NODE_ENV);

console.log(`app: ${app.get('env')}`); //development or production

const serverPort = config.get('server.port');
const dbUrl = config.get('db.url');

console.log(`Server is running on port: ${serverPort}`);
console.log(`Connecting to database: ${dbUrl}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny')); //middleware for logging
  console.log('morgan enabled...');
}

/**Useful for authentiction and authorization */
app.use(authorize);
app.use(authenticate);
app.use(urlencoded({ extended: true }));
app.use(express.static('public')); //middleware for serving static files
app.use(helmet()); //middleware for security/

/**course routes */
app.use('/api', CourseRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
