/** @format */

const express = require('express');
const app = express();

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

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
