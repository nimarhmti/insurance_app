import { UseGetFormStructure } from "../../services/insurance.query";
import DynamicForm from "../dymnamicForm/dynamicForm";
import Loading from "../skeletoneLoading/Loading";

export default function Container() {
  const { data, isLoading } = UseGetFormStructure();
  const handleSubmit = async (values: unknown) => {
    console.log(values);
  };
  const isPending = isLoading || !data;
  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <DynamicForm formStructure={data["0"]} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
