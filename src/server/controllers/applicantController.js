const models = require('../models/applicantModels');

const applicantController = {};

applicantController.saveApplicant = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      age,
      rank
    } = req.body;

    const newApplicant = new models.Applicant({ firstName, lastName, age, rank });

    const results = await newApplicant.save();

  } catch (e) {
    console.log('Error in saveApplicant', e);
  }
  next();
}

module.exports = applicantController;
