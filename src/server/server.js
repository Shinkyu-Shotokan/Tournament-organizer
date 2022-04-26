const express = require('express');
const applicantController = require('./controllers/ApplicantController');
const app = express();
const port = 1337;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/applicant', applicantController.saveApplicant,
  (req, res) => {
    res.json(res.locals);
    console.log(res.locals);
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

