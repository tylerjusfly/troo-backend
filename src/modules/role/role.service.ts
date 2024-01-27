import { Request, Response } from 'express';
import { handleBadRequest, handleError, handleSuccess } from '../../constants/response-handler';
import { dataSource } from '../../database/dataSource';
import { Role } from '../../database/entites/role.entity';
import { Permissions } from '../../database/entites/permissions.entity';
import { convertToSlug } from '../../utils/convertToSlug';

export const createRoles = async (req: Request, res: Response) => {
	try {
		const { name }: { name: string } = req.body;

		if (!name) {
			return handleBadRequest(res, 400, 'role name is required');
		}

		const slugifyname = convertToSlug(name);

		const role = await dataSource.getRepository(Role).findOne({
			where: { slug: slugifyname },
		});

		if (role) {
			return handleBadRequest(res, 400, 'role already exist');
		}

		// Create role
		const createRole = dataSource.getRepository(Role).create({
			name,
			slug: slugifyname,
		});

		const results = await dataSource.getRepository(Role).save(createRole);

		return handleSuccess(res, results, 201, undefined);
	} catch (error) {
		return handleError(res, error);
	}
};

export const addPermissionsToRole = async (req: Request, res: Response) => {
	try {
		const { roleid, permissions }: { roleid: number; permissions: number[] } = req.body;

		if (!roleid) {
			return handleBadRequest(res, 400, 'role id is required');
		}

		const role = await dataSource.getRepository(Role).findOne({
			where: { id: roleid },
		});

		if (!role) {
			return handleBadRequest(res, 400, 'role not found');
		}

		// save permissions
		const selectedPermission = [];

		if (permissions && permissions.length > 0) {
			for (const permission of permissions) {
				const rolePermission = await dataSource.getRepository(Permissions).findOne({
					where: { id: permission },
				});
				if (rolePermission) {
					selectedPermission.push(rolePermission);
				}
			}

			role.permissions = selectedPermission;

			await role.save();
		}

		return handleSuccess(res, 'roles added', 200);
	} catch (error) {
		return handleError(res, error);
	}
};

export const fetchRoleById = async (req: Request, res: Response) => {
	try {
		const { id }: { id: number } = req.body;

		if (!id) {
			return handleBadRequest(res, 400, 'role id is required');
		}

		const role = await dataSource.getRepository(Role).findOne({
			where: { id },
			relations: ['permissions'],
		});

		if (!role) {
			return handleBadRequest(res, 400, 'role does not exist');
		}

		return handleSuccess(res, role, 200, undefined);
	} catch (error) {
		return handleError(res, error);
	}
};
