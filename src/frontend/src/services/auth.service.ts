import { UserRegistrationData, UserLoginData, SubscriptionPlan, UserRole } from './../common/types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    subscriptionPlan: SubscriptionPlan;
  };
}

/**
 * Registers a new user.
 * @param userData The user registration data.
 * @returns The authentication response from the server.
 */
export const register = async (userData: UserRegistrationData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register');
  }

  return response.json();
};

/**
 * Logs in a user.
 * @param userData The user login data.
 * @returns The authentication response from the server.
 */
export const login = async (userData: UserLoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Invalid credentials');
  }

  return response.json();
};

/**
 * Stores the auth token and user info in local storage.
 * @param token The JWT token.
 * @param user The user object.
 */
export const storeAuthData = (token: string, user: AuthResponse['user']) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Retrieves auth data from local storage.
 * @returns The stored token and user object, or null if not found.
 */
export const getAuthData = (): { token: string; user: AuthResponse['user'] } | null => {
  const token = localStorage.getItem('authToken');
  const userString = localStorage.getItem('user');

  if (token && userString) {
    return {
      token,
      user: JSON.parse(userString),
    };
  }
  return null;
};

/**
 * Clears auth data from local storage.
 */
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
