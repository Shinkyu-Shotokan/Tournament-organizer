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
  }
);

app.get('/applicant', applicantController.getAllApplicants,
  (req, res) => {
    res.send(res.locals);
  }
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

