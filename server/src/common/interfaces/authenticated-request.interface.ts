import { Request } from 'express';
import { User } from '@prisma/client'; // Make sure this import path is correct

export interface AuthenticatedRequest extends Request {
  user: User;
}
