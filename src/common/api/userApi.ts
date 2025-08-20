import { IResponse, Params } from "../types/api";
import User from "../types/user";
import api from "./index";

export const getAllUser = async (
  params?: Params
): Promise<IResponse<User[]>> => {
  const res = await api.get("/users", { params });
  return res.data;
};

export const blockUser = async (userId: string, isBlocked: boolean) => {
  const res = await api.patch(`/users/block/${userId}`, { isBlocked });
  return res.data.data;
};

export const createUser = async (
  payload: Omit<User, "_id" | "isBlocked" | "createdAt" | "updatedAt">
): Promise<User> => {
  const res = await api.post("/users", payload);
  return res.data.data;
};

export const updateUserRole = async (
  id: string,
  payload: Partial<Omit<User, "_id" | "isBlocked" | "createdAt" | "updatedAt">>
): Promise<User> => {
  const res = await api.patch(`/users/role/${id}`, payload);
  return res.data.data;
};
