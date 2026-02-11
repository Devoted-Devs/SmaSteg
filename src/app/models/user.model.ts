export type UserRole = 'TEACHER' | 'PARENT';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}
