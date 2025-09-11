import { useQuery } from "@tanstack/react-query";
import { fecthScore, ScoreResponse } from "@/service/score.service";
import { getValueFromStorage } from "@/utils/async-storage";

export const useScoreViewModel = () => {
  const { data, isError, error, status } = useQuery({
    queryKey: ["score"],
    queryFn: fecthScore,
  });

  const ranking: ScoreResponse[] = data || [];

  return {
    userId:
      getValueFromStorage().then((id) => {
        return id;
      }) || null,
    data: ranking,
    isError,
    error,
    status,
  };
};

export default useScoreViewModel;
