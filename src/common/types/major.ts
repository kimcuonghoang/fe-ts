export type Major = {
  _id: string;
  name: string;
  code: string;
  description: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};