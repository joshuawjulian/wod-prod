import * as argon2 from 'argon2';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import type { WebsiteRolesEnumType } from './db/schema/auth.schema';
import { getUserPayload } from './db/services/auth.services';

export const hashPassword = async (password:string):Promise<string> => {
  return await argon2.hash(password);
}

export interface UserPayload {
  id: string
  websiteRole: WebsiteRolesEnumType
}

export const generateAccessToken = async (userId:string): Promise<string> => {
  const payload = await getUserPayload(userId);
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SIGN || '', {
    expiresIn: '15m',
    algorithm: 'HS256'
  });
}