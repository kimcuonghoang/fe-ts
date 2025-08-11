import { IResponse, Params } from "../types/api";
import { Subject } from "../types/subject";
import api from "./index";

export const getAllSubjects = async (
  params?: Params
): Promise<IResponse<Subject[]>> => {
  const res = await api.get("/subjects", { params });
  return res.data;
};

export const createSubject = async (
  payload: Omit<Subject, "_id" | "deletedAt" | "createdAt" | "updatedAt">
): Promise<Subject> => {
  const res = await api.post("/subjects", payload);
  return res.data;
};

export const updateSubject = async (
  id: string,
  payload: Partial<
    Omit<Subject, "_id" | "deletedAt" | "createdAt" | "updatedAt">
  >
): Promise<Subject> => {
  const res = await api.patch(`/subjects/${id}`, payload);
  return res.data;
};

export const softDeleteSubject = async (id: string): Promise<Subject> => {
  const res = await api.patch(`/subjects/soft-delete/${id}`);
  return res.data;
};

export const restoreSubject = async (id: string): Promise<Subject> => {
  const res = await api.patch(`/subjects/restore/${id}`);
  return res.data;
};
