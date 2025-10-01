import { User, IUser } from '../models'

export class UserRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).populate('clinic');
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).populate('clinic');
  }

  async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
  }

    async updateUserProfile(userId: string, updateData: { name?: string; email?: string; phone?: string; profileImageUrl?: string }): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, select: '-password' }
    ).populate('clinic');
  }
}
