import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  generateInterviewQuestions,
  getAllInterviews,
  deleteInterview,
} from "@/api/interview.api";

export const useInterviews =
  () => {
    return useQuery({
      queryKey: ["interviews"],
      queryFn: getAllInterviews,
    });
  };

export const useGenerateInterview =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        generateInterviewQuestions,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["interviews"],
        });
      },
    });
  };

export const useDeleteInterview =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: deleteInterview,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["interviews"],
        });
      },
    });
  };