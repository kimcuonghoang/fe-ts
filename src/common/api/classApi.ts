import { IResponse, Params } from "../types/api";
import { Class } from "../types/class";
import api from "./index";

export const getAllClass = async (
  params?: Params
): Promise<IResponse<Class[]>> => {
  const res = await api.get("/classes", { params });

  return res.data;
};
export const getClassById = async (id: string): Promise<Class[]> => {
  const res = await api.get(`/classes/${id}`);
  return res.data.data;
};
export const createClass = async (
  payload: Omit<Class, "_id" | "deletedAt" | "createdAt" | "updatedAt">
): Promise<Class> => {
  const res = await api.post("/classes", payload);
  return res.data;
};

export const updateClass = async (
  id: string,
  payload: Partial<Omit<Class, "_id" | "deletedAt" | "createdAt" | "updatedAt">>
): Promise<Class> => {
  const res = await api.patch(`/classes/${id}`, payload);
  return res.data;
};

export const softDelteClass = async (id: string): Promise<Class> => {
  const res = await api.patch(`/classes/soft-delete/${id}`);
  return res.data;
};
export const restoreClass = async (id: string): Promise<Class> => {
  const res = await api.patch(`/classes/restore/${id}`);
  return res.data;
};
export const getStudentsByClassId = async (classId: string) => {
  const res = await api.get(`/classes/${classId}/students`);
  return res.data.data;
};
// export const deleteClass = async (id: string) => {
//   const res = await api.delete(`/classes/${id}`);
//   return res.data;
// };
