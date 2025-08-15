import { hashPassword, type UserPayload } from '$lib/server/auth';
import { sql } from '$lib/server/db/conn';
import type { WebsiteRolesSelectType } from '../schema/auth.schema';

export const registerNewUser = async (email: string, password: string) => {
	const hash = await hashPassword(password)
	const result = await sql`
  WITH inserted_user AS (
    INSERT INTO users (email, password_hash) VALUES (${email}, ${hash})
    RETURNING id
  )
  INSERT INTO users_email_confirmed (user_id, confirmed, token)
  SELECT id, true, gen_random_uuid() FROM inserted_user;
  `;
};

export const getAllUsers = async () => {
	const result = await sql`
    SELECT *  FROM users;
  `;

	return result;
};

export const getUserPayload = async(userId:string):Promise<UserPayload> => {
  const [role]: [WebsiteRolesSelectType?] = await sql`
    SELECT role FROM website_roles WHERE user_id = ${userId}
  `
  if(!role) throw new Error('getUserPayload(): didnt return a user');

  return {
    id: userId,
    websiteRole: role.role
  }
    
}