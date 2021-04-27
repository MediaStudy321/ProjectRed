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
      type: Number
    },
    second: {
      type: Number
    },
    third: {
      type: Number
    }
  },
  characters: {
    type: [Number]
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
      type: Number
    },
    second: {
      type: Number
    },
    third: {
      type: Number
    }
  },
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
  rank: {
    type: Number,
    required: true,
  }
});

const enemySchema = new mongoose.Schema({
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
  }
});
const user = mongoose.model('user', userSchema);
const player = mongoose.model('player', playerSchema);
const character = mongoose.model('character', characterSchema);
const enemy = mongoose.model('enemy', enemySchema);
const level = mongoose.model('level', levelSchema);

module.exports= {user,player,character,enemy,level};
