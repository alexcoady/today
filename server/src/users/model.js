import mongoose from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
  name: String,
  password: String,
  admin: Boolean,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
}));
