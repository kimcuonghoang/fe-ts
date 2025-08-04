import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClass,
  createClass,
  updateClass,
  deleteClass,
  Class,
  restoreClass,
} from "../api/classApi";
import { message } from "antd";

export const useClassQuery = () => {
  return useQuery<Class[]>({
    queryKey: ["Class"],
    queryFn: getClass,
    gcTime: 1000 * 60 * 5,
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Class"] });
      message.success("Tạo mới thành công");
    },
    onError: () => {
      message.error("Tạo mới thất bại");
    },
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Class, "_id"> }) =>
      updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Class"] });
      message.success("Cập nhật thành công");
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Class"] });
      message.success("Xóa thành công!");
    },
    onError: () => {
      message.error("Xóa thất bại");
    },
  });
};

export const useRestoreClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreClass,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Class"] }),
  });
};
