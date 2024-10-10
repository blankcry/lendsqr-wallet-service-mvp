import {Router, Application} from 'express';
import userController from '../modules/user/user.controller';
import {validateToken} from '../middleware/auth.middleware';

const router = Router();

router.post('/', userController.create as Application);
router.use(validateToken as Application);
router.get('/', userController.get as Application);

export default router;
