import { UseGetFormStructure } from "../../services/insurance.query";
import { mocData } from "../../types";
import DynamicForm from "../dymnamicForm/dynamicForm";

export default function Container() {
  const { data } = UseGetFormStructure();
  const handleSubmit = async (values: unknown) => {
    console.log(values);
  };
  console.log(data);
  return (
    <div>
      <DynamicForm formStructure={mocData["0"]} onSubmit={handleSubmit} />
    </div>
  );
}
