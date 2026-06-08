import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getResumes, uploadResume, deleteResume } from "../../api/resume.api";

export const useResumes = () =>
  useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
  });

export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResume,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });
};
