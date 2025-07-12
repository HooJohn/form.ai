import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import * as userService from '../services/user.service';
import { UserProfile, UserRegistrationData } from '../common/types';
import { LanguageCode, UserRole } from '../common/types/Shared';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('FATAL_ERROR: JWT_SECRET is not defined in environment variables.');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

/**
 * @description Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2. Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save the new user
    const newUserProfileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'> = {
      email,
      hashedPassword,
      firstName,
      lastName,
      // Setting defaults, these could be part of the request body in a full implementation
      preferredLanguage: 'zh-HK', // This should be a string literal based on LanguageCode type
      role: UserRole.PARENT, 
    };
    const newUser = await userService.createUser(newUserProfileData);

    // 5. Generate a JWT
    const payload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, { expiresIn: JWT_EXPIRES_IN } as SignOptions);

    // 6. Send response
    res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Authenticate a user and get a token
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2. Find user by email
    const user = await userService.findUserByEmail(email);
    if (!user || !user.hashedPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 3. Compare submitted password with stored hash
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 4. Generate a JWT
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, { expiresIn: JWT_EXPIRES_IN } as SignOptions);

    // 5. Send response
    res.status(200).json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
