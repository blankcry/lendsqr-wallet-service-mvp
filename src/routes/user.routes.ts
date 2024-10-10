import {Router, Application} from 'express';
import userController from '../modules/user/user.controller';
import {validateToken} from '../middleware/auth.middleware';
import contactController from '@src/modules/user/contact.controller';

const router = Router();

router.post('/', userController.create as Application);
router.use(validateToken as Application);
router.get('/', contactController.get as Application);

export default router;
