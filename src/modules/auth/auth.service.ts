import { Request, Response } from 'express';
import { TCreate, TLogin } from '../../interfaces/auth';
import { validationResult } from 'express-validator';
import { handleBadRequest, handleError, handleSuccess } from '../../constants/response-handler';
import { dataSource } from '../../database/dataSource';
import { User } from '../../database/entites/user.entity';
import { isValidPassword } from '../../utils/password-helper';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { getToken } from '../../utils/token-helper';
import { convertToSlug } from '../../utils/convertToSlug';

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password }: TLogin = req.body;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((err) => err.msg);

			const errorMessageString = errorMessages.join(' | ');

			return handleBadRequest(res, 400, errorMessageString);
		}

		const IsUser = await dataSource.getRepository(User).findOne({
			where: {
				email,
			},
		});

		if (!IsUser) {
			return handleBadRequest(res, 400, 'Invalid user credentials');
		}

		let rs = await isValidPassword(IsUser, password);

		if (!rs.success) {
			return handleBadRequest(res, 400, 'Invalid user credentials');
		}

		const token = await getToken(IsUser);

		return handleSuccess(res, token, 200);
	} catch (error) {
		return handleError(res, error);
	}
};

export const create = async (req: Request, res: Response) => {
	try {
		const { fullname, email, password, company }: TCreate = req.body;

		if (!fullname || !email || !password || !company) {
			return handleBadRequest(res, 400, 'all fields are required');
		}

		// find company
		const company_slug = convertToSlug(company);

		const companyExist = await dataSource.getRepository(User).findOne({
			where: {
				company_slug,
			},
		});

		if (companyExist) {
			return handleBadRequest(res, 400, 'Company name is taken');
		}

		// check if company already has a super admin

		const hasSuperAdmin = await dataSource.getRepository(User).findOne({
			where: {
				company_slug: company_slug,
				user_type: 'super_admin',
			},
		});

		if (hasSuperAdmin) {
			return handleBadRequest(res, 400, `${company} already has a super admin`);
		}

		const salt = randomBytes(30).toString('hex');
		const hashedPass = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

		const createdUser = dataSource.getRepository(User).create({
			password: hashedPass,
			fullname,
			user_type: 'super_admin',
			email,
			salt,
			company,
			company_slug,
		});
		const results = await dataSource.getRepository(User).save(createdUser);

		return handleSuccess(res, results, 201, undefined);
	} catch (error) {
		return handleError(res, error);
	}
};
