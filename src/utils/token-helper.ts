import { TUserType } from '../interfaces/user';
import * as jwt from 'jsonwebtoken';

export interface ITokenPayload {
	user_type: string;
	id: number;
	company: string;
}

const secret = 'scagamore';

export const getPayload = (user: TUserType): ITokenPayload => {
	const payload = {
		user_type: user.user_type,
		id: user.id,
		company: user.company,
	};
	return payload;
};

export const getToken = async (user: TUserType) => {
	const payload: ITokenPayload = getPayload(user);
	const token = jwt.sign(payload, secret, {
		expiresIn: '30d',
	});
	return {
		token,
		payload,
	};
};
