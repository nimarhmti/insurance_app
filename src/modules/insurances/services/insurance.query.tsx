import { useQuery } from "@tanstack/react-query";
import { getInsurancesFormStructure } from "./_requests";

export const UseGetFormStructure = () =>
  useQuery({
    queryKey: ["from-structure"],
    queryFn: getInsurancesFormStructure,
  });
