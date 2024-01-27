import { Response, Request } from 'express';
import { handleBadRequest, handleError, handleSuccess } from '../../constants/response-handler';
import { dataSource } from '../../database/dataSource';
import { User } from '../../database/entites/user.entity';

import { TEditUser } from '../../interfaces/user';
import { IPaging } from '../../interfaces/pagination';
import { ITokenPayload } from '../../utils/token-helper';
import { convertToSlug } from '../../utils/convertToSlug';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { Iuser_type } from '../../interfaces/auth';
import { CustomRequest } from '../../middlewares/verifyauth';
import { Role } from '../../database/entites/role.entity';

const validUserTypes: Iuser_type[] = ['basic_user', 'basic_admin'];

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

export const getMyProfile = async (req: CustomRequest, res: Response) => {
	try {
		const userReq = req.user as ITokenPayload;

		const userProfile = await User.findOne({
			where: {
				id: userReq.id,
			},
		});

		if (!userProfile) {
			return handleBadRequest(res, 400, 'no user data available');
		}

		const { password, salt, ...otherUserData } = userProfile;

		return handleSuccess(res, otherUserData, 200, undefined);
	} catch (error) {
		return handleError(res, error);
	}
};

export const editProfile = async (req: Request, res: Response) => {
	try {
		const { id, fullname, telephone }: TEditUser = req.body;

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

export const addUser = async (req: CustomRequest, res: Response) => {
	try {
		const { fullname, email, type }: { fullname: string; email: string; type: Iuser_type } =
			req.body;

		if (!fullname || !email) {
			return handleBadRequest(res, 400, 'fullname | email is Required');
		}

		const AdminWithAddPrivilege = req?.user as ITokenPayload;

		if (!(AdminWithAddPrivilege.user_type === 'super_admin')) {
			return handleBadRequest(res, 400, `Only Super admin can add users`);
		}

		const isEmail = await User.findOne({
			where: {
				email: email,
				company: AdminWithAddPrivilege.company,
			},
		});

		if (isEmail) {
			return handleBadRequest(
				res,
				400,
				`user already exists in company ${AdminWithAddPrivilege.company}`
			);
		}

		// Password change should be cumpulsory for all users when they are logged in,
		const salt = randomBytes(30).toString('hex');
		const hashedPass = pbkdf2Sync('password', salt, 1000, 64, `sha512`).toString(`hex`);

		const user_type: Iuser_type = validUserTypes.includes(type) ? type : 'basic_user';

		const createUser = dataSource.getRepository(User).create({
			fullname,
			email,
			company: AdminWithAddPrivilege.company,
			company_slug: convertToSlug(AdminWithAddPrivilege.company),
			salt: salt,
			password: hashedPass,
			user_type,
		});

		const results = await dataSource.getRepository(User).save(createUser);

		return handleSuccess(res, results, 201, undefined);
	} catch (error) {
		return handleError(res, error);
	}
};

export const AssignRoleToUsers = async (req: Request, res: Response) => {
	try {
		const { userid, roleid }: { userid: number; roleid: number } = req.body;

		// Find user
		const isUser = await User.findOne({
			where: {
				id: userid,
			},
		});

		if (!isUser) {
			return handleBadRequest(res, 400, `user does not exist`);
		}

		// find role
		const role = await Role.findOne({
			where: { id: roleid },
		});

		if (!role) {
			return handleBadRequest(res, 400, 'role not found');
		}

		// assign role to user
		isUser.role_id = role;

		await isUser.save();

		return handleSuccess(res, 'role added', 200);
	} catch (error) {
		return handleError(res, error);
	}
};
