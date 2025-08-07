import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  Subject,
  restoreSubject,
  softDeleteSubject,
} from "../api/subjectApi";
import { message } from "antd";

export const useSubjectQuery = () => {
  return useQuery<Subject[]>({
    queryKey: ["subject"],
    queryFn: getSubject,
    gcTime: 1000 * 60 * 5,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
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
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      message.success("Cập nhật thành công");
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      message.success("Xóa thành công!");
    },
    onError: () => {
      message.error("Xóa thất bại");
    },
  });
};
export const useSoftDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: softDeleteSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subject"] }),
  });
};

export const useRestoreSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subject"] }),
  });
};
