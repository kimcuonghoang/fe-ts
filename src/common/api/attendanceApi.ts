import { AttendanceItem } from "../types/attendance";
import api from "./index";

export const checkAttendanceStatus = async (sessionId: string) => {
  const { data } = await api.get(`/attendances/status/${sessionId}`);
  return data as {
    data: { success: boolean; hasAttendance: boolean; classId: string };
  };
};

export const getAttendances = async (sessionId: string) => {
  const { data } = await api.get(`/attendances`, { params: { sessionId } });
  return data as {
    success: boolean;
    data: Array<{
      _id: string;
      sessionId: string;
      studentId: { _id: string; fullname: string; studentId?: string };
      status: boolean;
    }>;
  };
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
