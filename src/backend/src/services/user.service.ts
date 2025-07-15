import { UserProfile, UserRegistrationData, SubscriptionPlan, UserRole } from '../common/types';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// In-memory array to simulate a database
const users: UserProfile[] = [];

/**
 * Finds a user by their email address.
 * @param email The email of the user to find.
 * @returns The user profile if found, otherwise undefined.
 */
export const findUserByEmail = async (email: string): Promise<UserProfile | undefined> => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Finds a user by their ID.
 * @param id The ID of the user to find.
 * @returns The user profile if found, otherwise undefined.
 */
export const findUserById = async (id: string): Promise<UserProfile | undefined> => {
  return users.find(user => user.id === id);
};

/**
 * Creates a new user and saves them to the in-memory store.
 * @param userData The data for the new user.
 * @returns The newly created user profile.
 */
export const createUser = async (userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'subscriptionPlan'>): Promise<UserProfile> => {
  const newUser: UserProfile = {
    id: uuidv4(),
    ...userData,
    subscriptionPlan: SubscriptionPlan.FREE, // Default to Free plan
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

/**
 * Updates a user's profile data.
 * @param userId The ID of the user to update.
 * @param updates The fields to update.
 * @returns The updated user profile, or undefined if not found.
 */
export const updateUser = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | undefined> => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return undefined;
  }

  const updatedUser = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date(),
  };

  users[userIndex] = updatedUser;
  return updatedUser;
};

// Helper function to see the users in memory (for debugging)
export const getAllUsers = async (): Promise<UserProfile[]> => {
  return users;
};

/**
 * Creates a default admin user if no admin exists.
 * This should be called once on application startup.
 */
export const createAdminUserIfNotExists = async () => {
  const adminExists = users.some(user => user.role === UserRole.SYSTEM_ADMIN);
  if (!adminExists) {
    console.log('No admin user found. Creating a default admin...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD || 'admin123', salt);

    const adminUser: UserProfile = {
      id: uuidv4(),
      email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@form.ai',
      hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      preferredLanguage: 'en',
      role: UserRole.SYSTEM_ADMIN,
      subscriptionPlan: SubscriptionPlan.ENTERPRISE, // Admins get the highest tier
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(adminUser);
    console.log(`Default admin created with email: ${adminUser.email}`);
    console.log(`IMPORTANT: Use the password from your .env file (ADMIN_DEFAULT_PASSWORD) or the default 'admin123'.`);
  }
};
