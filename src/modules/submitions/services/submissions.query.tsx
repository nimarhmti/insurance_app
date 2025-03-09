import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "./_requests";

export const UseGetallSubmissions = () =>
  useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });
