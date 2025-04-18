/** @format */

import express, { urlencoded } from 'express';
import CourseRoutes from './routes';
import authenticate from './middleware/authenticate';
import authorize from './middleware/authorizate';

const app = express();

app.use(express.json()); //middleware

/**Useful for authentiction and authorization */
app.use(authorize);
app.use(authenticate);
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

/**course routes */
app.use('/api', CourseRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
