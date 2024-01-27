import { Router } from 'express';
import { createPermission } from './permissions.service';
import { verifySuperAdmin } from '../../middlewares/superadmincheck';
import { verifyToken } from '../../middlewares/verifyauth';

const permissionsouter = Router();

permissionsouter.post('/', verifyToken, verifySuperAdmin, createPermission);

export const PermissionsController = { router: permissionsouter };
