import { NextFunction, Request, Response } from 'express';
import { handleBadRequest } from '../constants/response-handler';
import { CustomRequest } from './verifyauth';
import { ITokenPayload } from '../utils/token-helper';
import { User } from '../database/entites/user.entity';
import { Permissions } from '../database/entites/permissions.entity';

export const authorize = (requiredPermissions: string[]) => {
	return [
		async (req: CustomRequest, res: Response, next: NextFunction) => {
			const { id } = req.user as ITokenPayload;

			const userProfile = await User.findOne({
				where: {
					id,
				},
				relations: ['role_id', 'role_id.permissions'],
			});

			console.log(userProfile?.role_id?.permissions, 'userr');

			let permissions: Permissions[] = [];

			/**  THis checks if user is not assigned to a role yet*/
			if (userProfile && userProfile?.role_id?.permissions) {
				permissions = userProfile?.role_id.permissions;
			}

			if (permissions.length) {
				const hasRequiredPermissions = requiredPermissions.every((p) =>
					permissions.some((permission) => permission.name === p)
				);
				if (hasRequiredPermissions) {
					next();
				} else {
					return handleBadRequest(res, 403, 'Permission denied');
				}
			} else {
				return handleBadRequest(res, 403, 'Unauthorized');
			}
		},
	];
};
