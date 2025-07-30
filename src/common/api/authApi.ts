import api from "./index";

export const authRegister = async (data: any) =>
  await api.post("/auth/register", data);

export const authLogin = async (data: any) =>
  await api.post("/auth/login", data);
