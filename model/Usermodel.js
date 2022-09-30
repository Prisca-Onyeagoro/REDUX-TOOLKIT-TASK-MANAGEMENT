import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, 'password must be stronger '],
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', UserSchema);

export default User;
