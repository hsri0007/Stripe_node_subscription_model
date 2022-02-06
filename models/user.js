import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  stripe_customer_id: String,
  subscriptions: [],
});

export default mongoose.model("User", userSchema);
