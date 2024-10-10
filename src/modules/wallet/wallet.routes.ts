import {validateToken} from '../../middleware/auth.middleware';
import postController from './controller/post.controller';
import walletController from './controller/wallet.controller';
import {Application, Router} from 'express';

const router: Router = Router();

router.use(validateToken as Application);
router.get('/', walletController.get as Application);
router.post('/:type', postController.create as Application);

export default router;
