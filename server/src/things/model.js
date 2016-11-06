// NPM dependencies
import mongoose, { Schema } from 'mongoose';

export const thingSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  slug: String,
  description: String,
  deleted: {
    type: Boolean,
    default: false
  }
});

const Thing = mongoose.model('Thing', thingSchema);

export default Thing;
