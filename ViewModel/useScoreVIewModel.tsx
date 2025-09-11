import { useQuery } from "@tanstack/react-query";
import { fecthScore, ScoreResponse } from "@/service/score.service";

export const useScoreViewModel = () => {
  const { data, isError, error, status } = useQuery({
    queryKey: ["score"],
    queryFn: fecthScore,
  });

  const ranking: ScoreResponse[] = data || [];

  return {
    data: ranking,
    isError,
    error,
    status,
  };
};

export default useScoreViewModel;
