export type TUserType = {
	id: number;
	fullname: string;
	user_type: string;
	company: string;
	email: string;
	telephone: string;
	password: string;
	salt: string;
};

export type TEditUser = {
	id: number;
	username: string;
	fullname: string;
	telephone: string;
};
