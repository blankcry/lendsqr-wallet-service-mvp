import adjutor from '../../lib/adjutor';
import {UserCreationDTO} from './interface';
import {NotFoundError, UnprocessableError} from '../../error';
import UserUtil from './util';
import {User} from '../../db/models';
import walletService from '../wallet/wallet.service';

class UserService {
  async createUser(payload: UserCreationDTO) {
    const {email} = payload;

    const isBlackListed = await adjutor.isBlackListed(email);
    if (isBlackListed) {
      throw new UnprocessableError('Sorry this email has been blacklisted');
    }

    const token = UserUtil.generateToken(email);
    const {name} = payload;
    const trx = await User.startTransaction();
    try {
      const user = await User.query(trx).insert({name, email, token});
      await walletService.handleWalletCreation(user.id, trx);
      await trx.commit();
      return user;
    } catch (err) {
      await trx.rollback();
      throw new UnprocessableError('User creation failed');
    }
  }

  async findUserViaToken(token: string) {
    const user = await User.query().findOne({
      token,
    });
    if (!user) {
      throw new NotFoundError('Unknown User Token');
    }
    return user;
  }

  async getContacts(user_id: number) {
    return User.query().whereNot('id', user_id).select(['id', 'name', 'email']);
  }
}

export default new UserService();
