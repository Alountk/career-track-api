import { z } from 'zod';
export const LoginCredentialsSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Password debe tener al menos 6 caracteres'),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export const UserSessionSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.string(),
  accessToken: z.string(),
});

export type UserSession = z.infer<typeof UserSessionSchema>;

export const UserDataSchema = z.object({
  name: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email().max(100),
  password: z.string().min(6).max(100),
  role: z.string(),
});

export type UserData = z.infer<typeof UserDataSchema>;