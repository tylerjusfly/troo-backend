import { Request, Response } from 'express';
import { dataSource } from '../../database/dataSource';
import { Permissions } from '../../database/entites/permissions.entity';
import { handleBadRequest, handleError, handleSuccess } from '../../constants/response-handler';
import { convertToSlug } from '../../utils/convertToSlug';

export const createPermission = async (req: Request, res: Response) => {
	try {
		const { name }: { name: string } = req.body;

		if (!name) {
			return handleBadRequest(res, 400, 'permission name is required');
		}

		const slugifyname = convertToSlug(name);

		const isPermission = await dataSource.getRepository(Permissions).findOne({
			where: { slug: slugifyname },
		});

		if (isPermission) {
			return handleBadRequest(res, 400, 'permission already exist');
		}

		// Create role
		const createPermission = dataSource.getRepository(Permissions).create({
			name,
			slug: convertToSlug(name),
		});

		const results = await dataSource.getRepository(Permissions).save(createPermission);

		return handleSuccess(res, results, 201, undefined);
	} catch (error) {
		return handleError(res, error);
	}
};
