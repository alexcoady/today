import mongoose from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
  name: String,
  password: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
}));
