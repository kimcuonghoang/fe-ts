import api from "./index";

export type Class = {
  _id: string;
  subjectId: string;
  majorId: string;
  name: string;
  teacherId: string;
  studentIds: string;
  startDate: Date;
  totalSessions: number;
  shift: string;
  deletedAt?: Date | null;
};

export const getClass = async (): Promise<Class[]> => {
  const res = await api.get("/classes");
  return res.data.data;
};

export const createClass = async (data: Omit<Class, "_id">) => {
  const res = await api.post("/classes", data);
  return res.data;
};

export const updateClass = async (id: string, data: Omit<Class, "_id">) => {
  const res = await api.patch(`/classes/${id}`, data);
  return res.data;
};

export const deleteClass = async (id: string) => {
  const res = await api.delete(`/classes/${id}`);
  return res.data;
};

export const softDelteClass = async (id: string) => {
  const res = await api.patch(`/classes/soft-delete/${id}`);
  return res.data;
};
export const restoreClass = async (id: string) => {
  const res = await api.patch(`/classes/restore/${id}`);
  return res.data;
};
