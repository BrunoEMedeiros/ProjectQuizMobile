import { scoreSchema, ScoreType } from "@/schemas/Score.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "@/utils/axios.config";
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
