import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  isGithub: {
    type: Boolean,
    default: false,
    required: true,
  },
  isGoogle: {
    type: Boolean,
    required: true,
    default: false,
  },
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  avatar: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: Boolean,
    required: true,
    default: false,
  },
  accountStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  lastConecction: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("users", userSchema);
