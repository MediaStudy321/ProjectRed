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
    type: Number,
    default: 0
  },
  party:{
    first: {
      type: String
    },
    second: {
      type: String
    },
    third: {
      type: String
    }
  },
  characters: {
    type: [String]
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


const user = mongoose.model('user', userSchema);
const player = mongoose.model('player', playerSchema);

module.exports= {user,player};
