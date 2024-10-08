import {Router, Request, Response} from 'express';

const router: Router = Router();

router.all('/', async (_req: Request, res: Response) => {
  res.json({
    message: 'User Resoource @Simple Wallet API.',
  });
});

export default router;
