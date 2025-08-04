import { useQuery } from "@tanstack/react-query";

import { getListStudent, getListTeacher, User } from "../api/userApi";

export const useTeacherQuery = () => {
  return useQuery<User[]>({
    queryKey: ["User", "Teacher"],
    queryFn: getListTeacher,
    gcTime: 1000 * 60 * 5,
  });
};

export const useStudentQuery = () => {
  return useQuery<User[]>({
    queryKey: ["User", "Students"],
    queryFn: getListStudent,
    gcTime: 1000 * 60 * 5,
  });
};
