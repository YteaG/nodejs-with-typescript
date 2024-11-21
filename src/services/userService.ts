import { IUser } from '../models/userModel';
import * as userRepository from '../repositories/userRepository';
import { hashPassword } from '../utils/hashHelper';

export const registerUser = async (userData: Partial<IUser>): Promise<IUser> => {
  // Check if the user already exists
  const existingUser = await userRepository.findUserByEmail(userData.email as string);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await hashPassword(userData.password as string);

  // Save the user
  const newUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async (email: string, password: string): Promise<void> => {

    const existingUser = await userRepository.findUserByEmail(email);
    if (!existingUser) {
      
    throw new Error("Email doesn't exist, please register.");
      
    }
    const enteredPassword = existingUser.comparePassword(password)
    const existingUserPassword = await existingUser!.password




}
