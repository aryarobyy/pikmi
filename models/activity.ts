import { Role } from './enum';

export interface ActivityLog {
  id: number;
  userId: number;
  actor: Role;
  action: string;
  targetTable: string;
  targetId: number;
  data?: any | null;
  createdAt: Date;
}
