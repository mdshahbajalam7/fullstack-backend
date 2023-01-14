const { Schema, model} = require("mongoose");

const AuthSchema = new Schema({
  Name: { type: String },
  Username: { type: String },
  Email: { type: String },
  DOB: { type: String },
  Role: {
    type: String,
    enum: ["Admin", "Explorer"],
  },
  Location: { type: String },
  Password: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Authuser = model("user", AuthSchema);
module.exports = Authuser;
