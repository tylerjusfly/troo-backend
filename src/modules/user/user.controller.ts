import { Router } from 'express';
import { editProfile, fetchUsers } from './user.service';
import { verifyToken } from '../../middlewares/verifyauth';

const userRouter = Router();

userRouter.get('/', /*verifyToken,*/ fetchUsers);
// userRouter.get('/profile', verifyToken, getMyProfile);
userRouter.patch('/', /*verifyToken,*/ editProfile);


export const UserController = { router: userRouter };
