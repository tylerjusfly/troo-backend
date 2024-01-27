import { Router } from 'express';
import { addPermissionsToRole, createRoles, fetchRoleById } from './role.service';

const RoleRouter = Router();

RoleRouter.post('/add-permission', addPermissionsToRole);
RoleRouter.post('/create', createRoles);
RoleRouter.get('/', fetchRoleById);

export const RoleController = { router: RoleRouter };
