import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMajors,
  createMajor,
  updateMajor,
  deleteMajor,
  Major,
  restoreMajor,
} from "../api/majorApi";

export const useMajorsQuery = () => {
  return useQuery<Major[]>({
    queryKey: ["majors"],
    queryFn: getMajors,
    gcTime: 1000 * 60 * 5, // Garbage collect after 5 minutes
  });
};

export const useCreateMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMajor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["majors"] }),
  });
};

export const useUpdateMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Major, "_id"> }) =>
      updateMajor(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["majors"] }),
  });
};

export const useDeleteMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMajor,
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
