import { Response, Request } from 'express';
import { handleBadRequest, handleError, handleSuccess } from '../../constants/response-handler';
import { dataSource } from '../../database/dataSource';
import { User } from '../../database/entites/user.entity';

import { TEditUser } from '../../interfaces/user';
import { IPaging } from '../../interfaces/pagination';
import { ITokenPayload } from '../../utils/token-helper';

export const fetchUsers = async (req: Request, res: Response) => {
	try {
		const { page, limit } = req.query;

		const page_limit = limit ? Number(limit) : 10;

		const offset = page ? (Number(page) - 1) * page_limit : 0;

		const query = dataSource
			.getRepository(User)
			.createQueryBuilder('q')
			.select(['q.id', 'q.fullname', 'q.user_type']);

		const AllUsers = await query
			.offset(offset)
			.limit(page_limit)
			.orderBy('q.created_at', 'DESC')
			.getMany();

		const usercount = await query.getCount();

		const totalPages = Math.ceil(usercount / page_limit);

		const paging: IPaging = {
			totalItems: usercount,
			currentPage: page ? Number(page) : 1,
			totalpages: totalPages,
			itemsPerPage: page_limit,
		};

		return handleSuccess(res, AllUsers, 200, undefined, paging);
	} catch (error) {
		handleError(res, error);
	}
};

// export const getMyProfile = async (req: Request, res: Response) => {
// 	try {
// 		const userReq = req.user as ITokenPayload;

// 		const userProfile = await User.findOne({
// 			where: {
// 				id: userReq.id,
// 			},
// 		});

// 		if (!userProfile) {
// 			return handleBadRequest(res, 400, 'no user data available');
// 		}

// 		const { password, salt, ...otherUserData } = userProfile;

// 		return handleSuccess(res, otherUserData, 200, undefined);
// 	} catch (error) {
// 		return handleError(res, error);
// 	}
// };

export const editProfile = async (req: Request, res: Response) => {
	try {
		const { id, fullname, username, telephone }: TEditUser = req.body;

		if (!id) {
			return handleBadRequest(res, 400, 'User Id is Required');
		}

		const userProfile = await User.findOne({
			where: {
				id: id,
			},
		});

		if (!userProfile) {
			return handleBadRequest(res, 400, 'no available user');
		}

		if (fullname && fullname !== '') {
			userProfile.fullname = fullname;
		}

		if (telephone && telephone !== '') {
			userProfile.telephone = telephone;
		}

		await userProfile.save();

		return handleSuccess(res, userProfile, 200, undefined);
	} catch (error) {
		return handleError(res, error);
	}
};
