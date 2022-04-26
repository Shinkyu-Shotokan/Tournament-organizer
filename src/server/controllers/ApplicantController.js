const applicantController = {};

applicantController.saveApplicant = (req, res, next) => {
  let {
    firstName,
    lastName,
    age,
    rank
  } = req.body;

  firstName = firstName + "poop";

  const results = { firstName, lastName, age, rank };

  res.locals = results;

  return next();
}

module.exports = applicantController;
