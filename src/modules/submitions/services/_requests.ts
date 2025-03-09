import { http } from "../../../services/http-services";

const serviceName = "/forms";

export const getSubmissions = async () => {
  try {
    const response = await http.get<unknown>(`${serviceName}/submissions`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
