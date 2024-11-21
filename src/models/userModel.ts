import mongoose, { Schema, Document } from 'mongoose';
const bcrypt = require("bcrypt");
// Define the User interface or type
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  try {
    console.log('---------no password', this.password);

    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
  } catch (error) {
    throw error;
  }
  
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
