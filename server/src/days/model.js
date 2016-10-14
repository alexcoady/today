// NPM dependencies
import mongoose, { Schema } from 'mongoose';

export const daySchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  isGood: Boolean
});

const Day = mongoose.model('Day', daySchema);

export default Day;
