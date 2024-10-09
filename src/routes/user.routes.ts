import userController from '../modules/user/user.controller';
import {Router, Application} from 'express';

const router = Router();

router.post('/', userController.create as Application);

export default router;
