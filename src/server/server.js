const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
const applicantController = require('./controllers/applicantController');
const port = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/applicant', applicantController.saveApplicant,
  (req, res) => {
    res.json({ id: res.locals.results.id });
  }
);

app.get('/applicant', applicantController.getAllApplicants,
  (req, res) => {
    res.send(res.locals);
  }
);

app.get('/applicant/:id', applicantController.getApplicant,
  (req, res) => {
    res.send(res.locals);
  }
);

app.put('/applicant/:id', applicantController.editApplicant,
  (req, res) => {
    res.send(res.locals);
  }
);

app.delete('/applicant/:id', applicantController.deleteApplicant,
  (req, res) => {
    res.status(200).send('Successfully deleted entry');
  }
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

