/** @format */

import express from 'express';
import Logger from './utils/logger';
import STATUS_CODES from './enum';
import validateInput from './utils/validation';

const app = express();

app.use(express.json()); //middleware

const instance = new Logger();

type tempDbType = {
  id: number;
  course: string;
};
let tempDb: tempDbType[] = [
  {
    id: 1,
    course: 'New course',
  },
];

/** */

app.get('/', (req, res) => {
  res.status(STATUS_CODES.SUCCESS).send('Hello world');
});

app.get('/api/courses', (req, res) => {
  res.end(JSON.stringify(tempDb));
});

app.post('/addNewCourse', (req, res) => {
  //validation
  const { error } = validateInput(req.body);
  if (error) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      message: 'Validation failed',
      details: error.details.map((detail) => detail.message),
    });
  }
  const newCourse = {
    id: tempDb.length + 1,
    course: req.body.course,
  };

  tempDb.push(newCourse);
  res
    .status(STATUS_CODES.SUCCESS)
    .send({ message: 'New course added', data: newCourse });
});

app.delete('/deleteCourse/:id', (req, res) => {
  const paramsID = parseInt(req.params.id);
  /**
   * check if id exists in the database
   */
  const courseExists = tempDb.some(({ id }) => id === paramsID);
  if (!courseExists)
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .send({ message: 'Course not found' });

  /**delete course */
  const index = tempDb.findIndex(({ id }) => id === paramsID);
  tempDb.splice(index, 1);
  res.status(STATUS_CODES.SUCCESS).send({ message: 'Course deleted' });
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
