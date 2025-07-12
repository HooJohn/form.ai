import { UserProfile, UserRegistrationData } from '@backend/common/types';
import { v4 as uuidv4 } from 'uuid';

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
export const createUser = async (userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProfile> => {
  const newUser: UserProfile = {
    id: uuidv4(),
    ...userData,
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
