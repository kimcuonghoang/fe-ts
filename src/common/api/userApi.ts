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
  majorId:
    | string
    | {
        name: string;
        _id: string;
      };
  studentId: string;
  isBlocked: boolean;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
};

export const getListTeacher = async () => {
  const res = await api.get("/users", { params: { role: "teacher" } });
  return res.data.data;
};

export const getListStudent = async () => {
  const res = await api.get("/users", { params: { role: "student" } });
  return res.data.data;
};

export const getAllUser = async () => {
  const res = await api.get("/users");
  return res.data.data;
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
