import { http } from "../../../services/http-services";
import { FormStructure } from "../types";

const serviceName = "/forms";

//get

export const getInsurancesFormStructure = async () => {
  try {
    const response = await http.get<FormStructure[]>(serviceName);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

//post

// export const formMutation = async (data: any) => {
//   try {
//     const response = await http.get<unknown>(serviceName);
//     return response.data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//   }
// };
