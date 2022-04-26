const mongoose = require('mongoose');

const MONGO_URI = process.env.ATLAS_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'tournament'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const applicantSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  rank: String
});

const Applicant = mongoose.model('applicant', applicantSchema);

module.exports = { Applicant };
