import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateCoverLetter,
  getAllCoverLetters,
  getCoverLetterById,
  deleteCoverLetter,
  downloadCoverLetter,
} from "@/api/coverLetter.api";

export const useCoverLetters = () => {
  return useQuery({
    queryKey: ["coverLetters"],
    queryFn: getAllCoverLetters,
  });
};

export const useCoverLetterById = (id) => {
  return useQuery({
    queryKey: ["coverLetters", id],
    queryFn: () => getCoverLetterById(id),
    enabled: !!id,
  });
};

export const useGenerateCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateCoverLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
    },
  });
};

export const useDeleteCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCoverLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
    },
  });
};

export const useDownloadCoverLetter = () => {
  return useMutation({
    mutationFn: downloadCoverLetter,
  });
};
