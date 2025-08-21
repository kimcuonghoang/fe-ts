import api from "./index";

export const getAllSessionByClassId = async (classId: string) => {
  const res = await api.get(`/sessions/classId/${classId}`);
  return res.data;
};

export const getSessionById = async (id: string) => {
  const res = await api.get(`/sessions/${id}`);
  return res.data.data;
};
