import {User} from '@src/db/models';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
