import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMajors,
  createMajor,
  updateMajor,
  restoreMajor,
  softDeleteMajor,
} from "../api/majorApi";
import { message } from "antd";
import { Major } from "../types/major";
import { IResponse, Params } from "../types/api";

export const useMajorsQuery = (params?: Params) => {
  return useQuery<IResponse<Major[]>>({
    queryKey: ["majors", params],
    queryFn: () => getAllMajors(params),
    staleTime: 1000 * 60 * 5,
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
