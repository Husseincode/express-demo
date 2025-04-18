/** @format */

import express from 'express';
import CourseRoutes from './routes';

const app = express();

app.use(express.json()); //middleware
app.use('/api', CourseRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
