import { form, query } from '$app/server';
import {
	getAllUsers,
	registerNewUser,
} from '$lib/server/db/services/auth.services';
import { z } from 'zod';

export type SignUpFormResponse =
	| {
			success: true;
	  }
	| {
			success: false;
			field: string;
			message: string;
	  };

export const signupUser = form(
	async (data: FormData): Promise<SignUpFormResponse> => {
		// Simulate a signup process
		//console.log("User data received:", data);

		let email = data.get('email');
		if (email === null) {
			return {
				success: false,
				field: 'email',
				message: 'Email is required',
			};
		}
		email = String(email).trim();
		let password = data.get('password');
		let confirmPassword = data.get('confirm_password');

		// Validate email
		const emailresult = z.email().safeParse(email);
		if (!emailresult.success) {
			return {
				success: false,
				field: 'email',
				message: emailresult.error.issues[0].message,
			};
		}

		password = password ? String(password).trim() : '';
		confirmPassword = confirmPassword ? String(confirmPassword).trim() : '';

		if (password != confirmPassword) {
			return {
				success: false,
				field: 'confirm_password',
				message: 'Passwords do not match',
			};
		}

		const strongPasswordRegex = new RegExp(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		);

		const strongPasswordSchema = z.string().regex(strongPasswordRegex, {
			message:
				'Password must be at least 8 characters, contain one uppercase, one lowercase, one number, and one special character.',
		});

		const passwordresult = strongPasswordSchema.safeParse(password);

		if (!passwordresult.success) {
			return {
				success: false,
				field: 'password',
				message: passwordresult.error.issues[0].message,
			};
		}
		const result = await registerNewUser(email, password);

		return { success: true };
	},
);

export const allUsers = query(async () => {
	return await getAllUsers();
});
