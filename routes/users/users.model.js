const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const Users = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    unique: true
  },
  address1: {
    type: String,
    required: true,
    minlength: 2
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: true,
    minlength: 2
  },
  state: {
    type: String,
    required: true,
    minlength: 2
  },
  dob: {
    type: Date,
    required: true,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  createdBy: {
    type: ObjectId,
    required: true    
  },
  updatedBy: {
    type: ObjectId,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model("users", Users);
