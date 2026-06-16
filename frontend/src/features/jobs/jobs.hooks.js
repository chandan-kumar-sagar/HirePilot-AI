import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobStats,
} from "@/api/job.api";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
};

export const useJobStats = () => {
  return useQuery({
    queryKey: ["job-stats"],
    queryFn: getJobStats,
  });
};

export const useCreateJob = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-stats"],
      });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }) =>
      updateJob(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};