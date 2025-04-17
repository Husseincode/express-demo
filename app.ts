/** @format */

import express from 'express';
import Logger from './logger';

const app = express();
const instance = new Logger();
let tempDb = [
  {
    id: 1,
    course: 'New course',
  },
];

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
  res.send(JSON.stringify(tempDb));
});

app.post('/addNewCourse/:id', (req, res) => {
  const paramsID = parseInt(req.params.id);
  /**
   * check if course is available
   * if course is available, return course already available
   * if not, add new course
   */
  const filteredTempDb = tempDb.filter(({ id }) => id === paramsID);
  if (filteredTempDb) {
    return res.send('Course already in database');
  }
  const newCourse = {
    id: paramsID,
    course: 'New Course Added',
  };
  tempDb.push(newCourse);
  res.send('Success');
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
