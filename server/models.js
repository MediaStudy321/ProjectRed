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
  user: {
    type: ObjectID
  },
  progress: {
    type: Number
  },
  party:{
    first: {
      type: [ObjectID]
    },
    second: {
      type: [ObjectID]
    },
    third: {
      type: [ObjectID]
    }
  },
  characters: {
    type: [ObjectID]
  },
  potions: {
    type: Number
  },
  rolls: {
    type: Number,
    default: 3
  },
  energy: {
    type: Number,
    default: 10
  }
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
  party:{
    first: {
      type: [ObjectID]
    },
    second: {
      type: [ObjectID]
    },
    third: {
      type: [ObjectID]
    }
  },
});

const user = mongoose.model('user', userSchema);
const player = mongoose.model('player', playerSchema);
const level = mongoose.model('level', levelSchema);

module.exports= {user,player,level};
