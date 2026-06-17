import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateJobMatch,
  getJobMatches,
  getJobMatchById,
  deleteJobMatch,
} from "@/api/jobMatch.api";

export const useJobMatches = () => {
  return useQuery({
    queryKey: ["jobMatches"],
    queryFn: getJobMatches,
  });
};

export const useJobMatchById = (id) => {
  return useQuery({
    queryKey: ["jobMatches", id],
    queryFn: () => getJobMatchById(id),
    enabled: !!id,
  });
};

export const useGenerateJobMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateJobMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobMatches"] });
    },
  });
};

export const useDeleteJobMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobMatches"] });
    },
  });
};
