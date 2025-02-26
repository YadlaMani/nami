import mongoose from "mongoose";
const AccountSchema = new mongoose.Schema({
  holder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Account = mongoose.model("Account", AccountSchema);
export default Account;
