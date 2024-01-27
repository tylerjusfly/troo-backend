import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { handleBadRequest, handleError } from '../constants/response-handler';



const SECRET_KEY = 'scagamore';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.header('Authorization')) {
			return handleBadRequest(res, 403, 'no token headers');
		}

		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) {
			return handleBadRequest(res, 401, 'un-authorised');
		}

		const decoded = jwt.verify(token, SECRET_KEY);
		(req as Request).user = decoded;

		next();
	} catch (error) {
		handleError(res, error);
	}
};
