const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const incidentSchema = new mongoose.Schema({
  dateTime: Date,
  location: {
    city: String,
    state: String,
    address: String,
  },
  suspectInformation: {
    numberOfSuspects: Number,
    weaponsUsed: String,
  },
  amountStolen: Number,
  description: String,
  robberyType: String,
  securityMeasures: String,
  youtubeLink: String,
  username: String,
});
const Data = mongoose.model("Datas", incidentSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Data };
