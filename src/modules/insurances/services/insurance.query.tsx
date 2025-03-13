import { useMutation, useQuery } from "@tanstack/react-query";
import { formMutation, getInsurancesFormStructure } from "./_requests";
import { queryClient } from "../../../providers/query-provider/QueryProvider";

export const UseGetFormStructure = () =>
  useQuery({
    queryKey: ["from-structure"],
    queryFn: getInsurancesFormStructure,
  });
export const UseFormMutation = () =>
  useMutation({
    mutationFn: formMutation,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
