import api from "./index";

export type User = {
  _id: string;
  role: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  schoolYear: string;
  majorId: string;
  studentId: string;
};

export const getListTeacher = async () => {
  const res = await api.get("/users", { params: { role: "teacher" } });
  return res.data.data;
};

export const getListStudent = async () => {
  const res = await api.get("/users", { params: { role: "student" } });
  return res.data.data;
};
