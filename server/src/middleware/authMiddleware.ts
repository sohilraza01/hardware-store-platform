import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

// Request mein user add karne ke liye type extend karo
export interface AuthRequest extends Request {
  user?: any;
}

// Sirf logged-in user ke liye
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Login karo pehle!' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid hai!' });
  }
};

// Sirf admin ke liye
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access chahiye!' });
  }
};