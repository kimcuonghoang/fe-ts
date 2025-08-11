import { IResponse, Params } from "../types/api";
import { Major } from "../types/major";
import api from "./index";

export const getAllMajors = async (
  params?: Params
): Promise<IResponse<Major[]>> => {
  const res = await api.get("/majors", { params });
  return res.data;
};

export const createMajor = async (
  payload: Omit<Major, "_id" | "deletedAt" | "createdAt" | "updatedAt">
): Promise<Major> => {
  const res = await api.post("/majors", payload);
  return res.data;
};

export const updateMajor = async (
  id: string,
  payload: Partial<Omit<Major, "_id" | "deletedAt" | "createdAt" | "updatedAt">>
): Promise<Major> => {
  const res = await api.patch(`/majors/${id}`, payload);
  return res.data;
};

export const softDeleteMajor = async (id: string): Promise<Major> => {
  const res = await api.patch(`/majors/soft-delete/${id}`);
  return res.data;
};

export const restoreMajor = async (id: string): Promise<Major> => {
  const res = await api.patch(`/majors/restore/${id}`);
  return res.data;
};
