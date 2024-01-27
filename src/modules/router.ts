import { Router } from 'express';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

const router = Router();

router.use('/auth', AuthController.router);
router.use('/users', UserController.router);
router.use('/users', UserController.router);

// router.use('/queue', QueueRouter.router);

export const apiRouter = router;
