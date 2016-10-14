// NPM dependencies
import mongoose, { Schema } from 'mongoose';

export const statusSchema = new Schema({
  name: String
});

const Status = mongoose.model('Status', statusSchema);

export default Status;
