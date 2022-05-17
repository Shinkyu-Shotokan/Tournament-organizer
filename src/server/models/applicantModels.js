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
  dojo: String,
  gender: String,
  birthdate: Date,
  age: Number,
  weight: Number,
  feet: Number,
  inches: Number,
  years: Number,
  beltColor: String,
  rank: String,
  kata: Boolean,
  kumite: Boolean,
  teamKata: Boolean,
  weapons: Boolean,
  kataDivision: String,
  kumiteDivision: String,
  teamKataDivision: String,
  weaponsDivision: String,
  teamMembers: String,
  amount: Number,
  payment: String,
  owed: Number,
  refund: Number
});

const Applicant = mongoose.model('applicant', applicantSchema);

module.exports = { Applicant };
