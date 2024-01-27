import { body } from 'express-validator';

export const loginValidationRules = [
	body('email').notEmpty().withMessage('email is required'),
	body('password').notEmpty().withMessage('Password is required'),
	body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 chars'),
	body('email').isLength({ min: 4 }).withMessage('email should be at least 4 chars'),
];
