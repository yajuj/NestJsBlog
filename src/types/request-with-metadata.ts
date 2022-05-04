import { Request } from 'express';
import { userMetadata } from './user.types';
export interface RequestWithMetadata extends Request {
  user: userMetadata;
}
