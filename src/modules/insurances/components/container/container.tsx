import { Divider, Typography } from "antd";
import {
  UseFormMutation,
  UseGetFormStructure,
} from "../../services/insurance.query";
import DynamicForm from "../dymnamicForm/dynamicForm";
import Loading from "../skeletoneLoading/Loading";
import { useNotification } from "../../../../providers/notification-provider/notificationProvider";

export default function Container() {
  const { data, isLoading } = UseGetFormStructure();
  const { showNotification } = useNotification();

  const { mutate, isPending: mutatePending } = UseFormMutation();

  const handleSubmit = async (values: unknown) => {
    console.log(values);
    mutate(values, {
      onSuccess() {
        showNotification(
          "success",
          "Success",
          "the from was submitted successfully!",
          "top"
        );
      },
      onError() {
        showNotification("error", "Error", "something went Wrong!", "top");
      },
    });
  };

  const isPending = isLoading || !data;
  // Find the selected form based on the selectedFormId

  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <Typography.Title level={3}>Insurances</Typography.Title>
          <Typography.Text strong>please select a form</Typography.Text>
          <Divider />
          {/* Display the selected form */}
          <DynamicForm
            formStructure={data}
            onSubmit={handleSubmit}
            isLoading={mutatePending}
          />
        </>
      )}
    </div>
  );
}
