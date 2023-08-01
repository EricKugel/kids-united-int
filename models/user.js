import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  userName: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },

  country: {
    type: String,
  },
  pronouns: {
    type: String,
  },
  bio: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
  phone: {
    type: String,
  },
  ig: {
    type: String,
  },
  snap: {
    type: String,
  },
  title: {
    type: String,
  },
});

const User = models?.User || model("User", UserSchema);
export default User;
