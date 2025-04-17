/** @format */

import express from 'express';
import Logger from './logger';
import STATUS_CODES from './enum';

const app = express();
const instance = new Logger();
let tempDb = [
  {
    id: 1,
    course: 'New course',
  },
];

app.get('/', (req, res) => {
  res.status(STATUS_CODES.SUCCESS).send('Hello world');
});

app.get('/api/courses', (req, res) => {
  res.end(JSON.stringify(tempDb));
});

app.post('/addNewCourse/:id', (req, res) => {
  const paramsID = parseInt(req.params.id);
  /**
   * check if course is available
   * if course is available, return course already available
   * if not, add new course
   */

  // Check if course with the given ID already exists
  const courseExists = tempDb.some(({ id }) => id === paramsID);
  if (courseExists) {
    return res
      .status(STATUS_CODES.CONFLICT)
      .send({ message: 'Course already in database' });
  }
  const newCourse = {
    id: paramsID,
    course: 'New Course Added',
  };
  tempDb.push(newCourse);
  res.status(STATUS_CODES.SUCCESS).send({ message: 'New course added' });
});

app.get('/loggerSample', (req, res) => {
  instance.log('messageLogged', { id: 1, content: 'message has been logged' });

  instance.on('messageLogged', (args) => {
    console.log(args);
    res.send(JSON.stringify(args));
  });
});

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
