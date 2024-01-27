import { Router } from 'express';
import { createPermission } from './permissions.service';

const permissionsouter = Router();

permissionsouter.post('/', createPermission);

export const PermissionsController = { router: permissionsouter };
