import { useQuery } from "@tanstack/react-query";

import { getResumeById } from "../../api/resume.api";

export const useResumeDetails = (id) => {
  return useQuery({
    queryKey: ["resume", id],

    queryFn: () => getResumeById(id),

    enabled: !!id,
  });
};
