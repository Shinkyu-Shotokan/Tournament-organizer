const models = require('../models/applicantModels');

const applicantController = {};

applicantController.saveApplicant = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      dojo,
      gender,
      birthdate,
      age,
      weight,
      feet,
      inches,
      years,
      beltColor,
      rank,
      kata,
      kumite,
      teamKata,
      weapons,
      kataDivision,
      kumiteDivision,
      teamKataDivision,
      weaponsDivision,
      teamMembers,
      amount,
      payment,
      owed,
      refund
    } = req.body;

    // const newApplicant = new models.Applicant({ firstName, lastName, age, rank });
    const newApplicant = new models.Applicant(req.body);

    res.locals.results = await newApplicant.save();

  } catch (e) {
    console.log('Error in saveApplicant', e);
  }
  next();
}

applicantController.getAllApplicants = async (req, res, next) => {
  try {
    const results = await models.Applicant.find();
    res.locals.applicants = results;
  } catch (e) {
    console.log('Error in getAllApplicants, ' + e);
  }
  next();
}

applicantController.getApplicant = async (req, res, next) => {
  try {
    const results = await models.Applicant.findById(req.params.id);
    res.locals = results;
  } catch (e) {
    console.log('Error in getApplicant, ' + e);
  }
  next();
}

applicantController.editApplicant = async (req, res, next) => {
  try {
    models.Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, docs) => {
      if (err) console.log('err: ', err);
      else {
        res.locals = docs;
        console.log('Updated : ', res.locals);
      }
      next();
    })
  } catch (e) {
    console.log('Error in editApplicant, ' + e);
    next();
  }
}

applicantController.deleteApplicant = async (req, res, next) => {
  try {
    await models.Applicant.findByIdAndDelete(req.params.id, (err, docs) => {
      if (err) console.log('err: ', err);
      else console.log('Deleted : ', docs);
    })
  } catch (e) {
    console.log('e: ', e);
  }
  next();
}

module.exports = applicantController;
