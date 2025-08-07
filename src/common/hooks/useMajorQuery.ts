import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMajors,
  createMajor,
  updateMajor,
  deleteMajor,
  Major,
  restoreMajor,
  softDeleteMajor,
} from "../api/majorApi";
import { message } from "antd";

export const useMajorsQuery = () => {
  return useQuery<Major[]>({
    queryKey: ["majors"],
    queryFn: getMajors,
    gcTime: 1000 * 60 * 5,
  });
};

export const useCreateMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMajor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["majors"] });
      message.success("Tạo mới thành công");
    },
    onError: () => {
      message.error("Tạo mới thất bại");
    },
  });
};

export const useUpdateMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Major, "_id"> }) =>
      updateMajor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["majors"] });
      message.success("Cập nhật thành công");
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });
};

export const useDeleteMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMajor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["majors"] });
      message.success("Xóa thành công!");
    },
    onError: () => {
      message.error("Xóa thất bại");
    },
  });
};
export const useSoftDeleteMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: softDeleteMajor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["majors"] }),
  });
};
export const useRestoreMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreMajor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["majors"] }),
  });
};
