// NPM dependencies
import mongoose, { Schema } from 'mongoose';

export const daySchema = new Schema({
  date: Date,
  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status'
  }
});

const Day = mongoose.model('Day', daySchema);

export default Day;
