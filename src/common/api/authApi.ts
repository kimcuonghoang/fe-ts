import api from "./index";

export const authRegister = async (data: any) =>
  await api.post("/auth/register", data);

export const authLogin = async (data: any) =>
  await api.post("/auth/login", data);

export const authForgotPassword = async (email: string) =>
  await api.post("/auth/forgot-password", { email });

export const authResetPassword = async (
  resetToken: string,
  newPassword: string
) => await api.post("/auth/reset-password", { resetToken, newPassword });
