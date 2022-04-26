const express = require('express');

const app = express();
require('dotenv').config();
const applicantController = require('./controllers/applicantController');
const port = process.env.PORT || 1337;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/applicant', applicantController.saveApplicant,
  (req, res) => {
    res.send('success');
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

