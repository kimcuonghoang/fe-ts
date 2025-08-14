import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  blockUser,
  getAllUser,
  getListStudent,
  getListTeacher,
  User,
} from "../api/userApi";

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

export const useUserQuery = () => {
  return useQuery<User[]>({
    queryKey: ["USER"],
    queryFn: getAllUser,
  });
};

export const useBlockeUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      isBlocked,
    }: {
      userId: string;
      isBlocked: boolean;
    }) => blockUser(userId, isBlocked),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["USER"] }),
  });
};
