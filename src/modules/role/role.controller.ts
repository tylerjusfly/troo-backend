import { Router } from 'express';
import { addPermissionsToRole, createRoles, fetchRoleById } from './role.service';
import { verifyToken } from '../../middlewares/verifyauth';
import { verifySuperAdmin } from '../../middlewares/superadmincheck';
import { authorize } from '../../middlewares/authorize';

const RoleRouter = Router();

RoleRouter.post('/add-permission', verifyToken, verifySuperAdmin, addPermissionsToRole);
RoleRouter.post('/create', verifyToken, verifySuperAdmin, createRoles);
RoleRouter.get('/', verifyToken, authorize(['view-roles']), fetchRoleById);

export const RoleController = { router: RoleRouter };
