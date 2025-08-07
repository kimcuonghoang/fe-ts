import api from "./index";

export type Subject = {
  _id: string;
  name: string;
  englishName: string;
  code: string;
  description: string;
  deletedAt?: Date | null;
};

export const getSubject = async (): Promise<Subject[]> => {
  const res = await api.get("/subjects");
  return res.data.data;
};

export const createSubject = async (data: Omit<Subject, "_id">) => {
  const res = await api.post("/subjects", data);
  return res.data;
};

export const updateSubject = async (id: string, data: Omit<Subject, "_id">) => {
  const res = await api.patch(`/subjects/${id}`, data);
  return res.data;
};

export const deleteSubject = async (id: string) => {
  const res = await api.delete(`/subjects/${id}`);
  return res.data;
};
export const restoreSubject = async (id: string) => {
  const res = await api.patch(`/subjects/restore/${id}`);
  return res.data;
};
export const softDeleteSubject = async (id: string) => {
  const res = await api.patch(`/subjects/soft-delete/${id}`);
  return res.data;
};
