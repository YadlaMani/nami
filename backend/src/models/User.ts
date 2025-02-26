import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
