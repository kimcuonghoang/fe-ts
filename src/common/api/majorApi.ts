import api from "./index";

export type Major = {
  _id: string;
  name: string;
  code: string;
  description: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
};

export const getMajors = async (): Promise<Major[]> => {
  const res = await api.get("/majors");
  return res.data.data;
};

export const createMajor = async (data: Omit<Major, "_id">) => {
  const res = await api.post("/majors", data);
  return res.data;
};

export const updateMajor = async (id: string, data: Omit<Major, "_id">) => {
  const res = await api.patch(`/majors/${id}`, data);
  return res.data;
};

export const deleteMajor = async (id: string) => {
  const res = await api.delete(`/majors/${id}`);
  return res.data;
};
export const restoreMajor = async (id: string) => {
  const res = await api.patch(`/majors/restore/${id}`);
  return res.data;
};
