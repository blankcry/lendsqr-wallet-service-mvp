import {validateToken} from '@src/middleware/auth.middleware';
import postController from '@src/modules/wallet/post.controller';
import walletController from '@src/modules/wallet/wallet.controller';
import {Router} from 'express';

const router: Router = Router();

router.use(validateToken);
router.get('/', walletController.get);
router.post('/:type', postController.create);

export default router;
