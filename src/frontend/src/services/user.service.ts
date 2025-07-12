import { UserProfile } from './../common/types';
import { getAuthData } from './auth.service';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

type PublicUserProfile = Omit<UserProfile, 'hashedPassword'>;

const getHeaders = () => {
  const authData = getAuthData();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (authData?.token) {
    headers['Authorization'] = `Bearer ${authData.token}`;
  }
  return headers;
};

/**
 * Fetches the current user's profile.
 * @returns A promise that resolves to the user's profile.
 */
export const getProfile = async (): Promise<PublicUserProfile> => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
};

/**
 * Updates the current user's profile.
 * @param profileData The data to update.
 * @returns A promise that resolves to the updated user profile.
 */
export const updateProfile = async (profileData: Partial<PublicUserProfile>): Promise<PublicUserProfile> => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
};
