import {Router, Request, Response} from 'express';

const router: Router = Router();

router.all('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Wallet Resource @Simple Wallet API.',
  });
});

export default router;
