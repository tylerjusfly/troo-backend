import { Router } from 'express';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { PermissionsController } from './permissions/permissions.controller';

const router = Router();

router.use('/auth', AuthController.router);
router.use('/users', UserController.router);
router.use('/role', RoleController.router);
router.use('/permission', PermissionsController.router);

// router.use('/queue', QueueRouter.router);

export const apiRouter = router;
