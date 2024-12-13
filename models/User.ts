import mongoose, { Schema, Model } from "mongoose";

interface IUser {
  name: string;
  username: string;
  preferred_timezone: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  preferred_timezone: { type: String, required: true },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

