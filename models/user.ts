import { Role } from './enum';

export interface User {
  id: number;
  imgUrl?: string | null;
  name: string;
  email: string;
  password?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
