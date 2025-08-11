import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  restoreSubject,
  softDeleteSubject,
} from "../api/subjectApi";
import { message } from "antd";
import { Subject } from "../types/subject";
import { IResponse, Params } from "../types/api";

export const useSubjectsQuery = (params?: Params) => {
  return useQuery<IResponse<Subject[]>>({
    queryKey: ["subjects", params],
    queryFn: () => getAllSubjects(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      message.success("Tạo mới thành công");
    },
    onError: () => {
      message.error("Tạo mới thất bại");
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Subject, "_id"> }) =>
      updateSubject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      message.success("Cập nhật thành công");
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });
};

export const useSoftDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: softDeleteSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};
export const useRestoreSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};
