import {Router, Request, Response} from 'express';
import userRoutes from './user.routes';
import walletRoutes from './wallet.routes';

const router: Router = Router();

router.all('/', async (_request: Request, response: Response) => {
  response.json({
    message: 'Simple Wallet API.',
  });
});
router.use('/user', userRoutes);
router.use('/wallet', walletRoutes);
export default router;
