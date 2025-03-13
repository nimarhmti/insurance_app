import { http } from "../../../services/http-services";
import { submissionModel } from "../types/submissions.types";

const serviceName = "/api/insurance/forms";

export const getSubmissions = async () => {
  try {
    const response = await http.get<submissionModel>(
      `${serviceName}/submissions`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
