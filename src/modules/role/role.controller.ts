import { Router } from 'express';
import { addPermissionsToRole, createRoles, fetchRoleById } from './role.service';
import { verifyToken } from '../../middlewares/verifyauth';
import { verifySuperAdmin } from '../../middlewares/superadmincheck';

const RoleRouter = Router();

RoleRouter.post('/add-permission', verifyToken, verifySuperAdmin, addPermissionsToRole);
RoleRouter.post('/create', verifyToken, verifySuperAdmin, createRoles);
RoleRouter.get('/', fetchRoleById);

export const RoleController = { router: RoleRouter };
