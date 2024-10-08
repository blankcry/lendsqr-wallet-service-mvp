import jwt from 'jsonwebtoken';
import configuration from '../../../config/server';

export default class UserUtil {
  static generateToken(email: string) {
    const {
      server: {secret},
    } = configuration;
    return jwt.sign({email}, secret);
  }
}
