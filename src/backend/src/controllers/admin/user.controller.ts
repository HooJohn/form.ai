import { Request, Response, NextFunction } from 'express';
import * as userService from '../../services/user.service';

/**
 * @description Get all users for the admin panel
 * @route GET /api/admin/users
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    // Exclude sensitive data like passwords before sending
    const safeUsers = users.map(user => {
      const { hashedPassword, ...safeUser } = user;
      return safeUser;
    });
    res.status(200).json(safeUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single user by ID for the admin panel
 * @route GET /api/admin/users/:id
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { hashedPassword, ...safeUser } = user;
    res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a user's profile by an admin
 * @route PUT /api/admin/users/:id
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // In a real app, you'd want to validate the incoming body
    const updatedUser = await userService.updateUser(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { hashedPassword, ...safeUser } = updatedUser;
    res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
};
