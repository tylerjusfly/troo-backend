import { Router } from 'express';
import { AssignRoleToUsers, addUser, editProfile, fetchUsers, getMyProfile } from './user.service';
import { verifyToken } from '../../middlewares/verifyauth';

const userRouter = Router();

userRouter.get('/', fetchUsers);
userRouter.get('/profile', verifyToken, getMyProfile);
userRouter.post('/add', verifyToken, addUser);
userRouter.post('/assign-roles', verifyToken, AssignRoleToUsers);
userRouter.patch('/', editProfile);


export const UserController = { router: userRouter };
