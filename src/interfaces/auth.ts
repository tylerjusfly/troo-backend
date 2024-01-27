export type TLogin = {
	email: string;
	password: string;
};

export type Iuser_type = 'super_admin' | 'basic_user' | 'basic_admin';

export type TCreate = {
	fullname: string;
	email: string;
	company: string;
	password: string;
	telephone?: string;
	is_admin: Iuser_type;
};

