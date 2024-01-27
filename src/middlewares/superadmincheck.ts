import { NextFunction, Request, Response } from 'express';
import { handleBadRequest, handleError } from '../constants/response-handler';
import { CustomRequest } from './verifyauth';
import { ITokenPayload } from '../utils/token-helper';
import { Iuser_type } from '../interfaces/auth';

const validUserTypes: Iuser_type[] = ['basic_admin', 'super_admin'];

export const verifySuperAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
	try {
		const userMakingRequest = req.user as ITokenPayload;

		if (userMakingRequest.user_type !== 'super_admin') {
			return handleBadRequest(res, 401, 'un-authorised');
		}

		next();
	} catch (error) {
		handleError(res, error);
	}
};
