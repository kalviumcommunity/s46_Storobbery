const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const incidentSchema = new mongoose.Schema({
  incidentID: Number,
  dateTime: Date,
  location: {
    city: String,
    state: String,
    address: String,
    description: String,
    robberyType: String,
    amountStolen: Number,
    securityMeasures: String,
  },
  suspectInformation: {
    securityCameraFootage: Boolean,
    name: String,
    email: String,
  },
});
const Data = mongoose.model('Datas', incidentSchema);
const User = mongoose.model("User", userSchema);
module.exports = {User,Data};
