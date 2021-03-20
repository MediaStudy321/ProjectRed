const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const playerSchema = new mongoose.Schema({
  progress: {
    type: Number,
    min: 1,
  },
  party: {},
  characters: {
    type: [characterSchema],
  },
  items: {},
  rolls: {
    type: Number,
    default: 3,
  },
});

const levelSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  initialReward: {
    type: Number,
    default: 2,
  },
  secondReward: {
    type: Number,
    default: 1,
  },
  party: {},
});

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  health: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  healing: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  Rank: {
    type: Number,
    required: true,
  },
  isOwned: {
    type: Boolean,
    default: false,
  },
});
