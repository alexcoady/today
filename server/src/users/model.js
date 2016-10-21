import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
  name: String,
  password: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  settings: {
    daysPerWeek: {
      type: Number,
      default: 4
    },
    weeksPerMonth: {
      type: Number,
      default: 2
    },
    monthsPerYear: {
      type: Number,
      default: 8
    }
  },
  things: [{
    type: Schema.Types.ObjectId,
    ref: 'Thing'
  }]
}));
