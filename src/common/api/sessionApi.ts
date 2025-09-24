import { IResponse, Params } from "../types/api";
import { Session } from "../types/session";
import api from "./index";

export const getAllSessionByClassId = async (
  classId: string | { _id: string },
  params?: Params
): Promise<IResponse<Session[]>> => {
  const id = typeof classId === "object" ? classId._id : classId;

  const { data } = await api.get(`/sessions/classId/${id}`, { params });

  return data.data.data;
};

export const getSessionById = async (
  classId: string | { _id: string },
  params?: Params
): Promise<IResponse<Session[]>> => {
  const id = typeof classId === "object" ? classId._id : classId;
  const { data } = await api.get(`/sessions/${id}`, { params });
  return data.data;
};
