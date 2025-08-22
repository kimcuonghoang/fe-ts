import { IResponse, Params } from "../types/api";
import { AttendanceItem } from "../types/attendance";
import api from "./index";

export const checkAttendanceStatus = async (sessionId: string) => {
  const { data } = await api.get(`/attendances/status/${sessionId}`);
  return data as {
    data: { success: boolean; hasAttendance: boolean; classId: string };
  };
};

export const getAttendances = async (
  params?: Params
): Promise<IResponse<AttendanceItem>> => {
  const { data } = await api.get(`/attendances`, { params });
  return data;
};

export const createAttendance = async (payload: AttendanceItem[]) => {
  const { data } = await api.post(`/attendances`, payload);
  return data as { success: boolean };
};

export const updateAttendance = async (
  sessionId: string,
  payload: Array<{ studentId: string; status: boolean }>
) => {
  const { data } = await api.patch(`/attendances/${sessionId}`, payload);
  return data as { success: boolean };
};
