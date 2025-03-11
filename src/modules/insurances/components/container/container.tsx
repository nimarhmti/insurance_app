import { Divider, Typography, Select } from "antd";
import {
  UseFormMutation,
  UseGetFormStructure,
} from "../../services/insurance.query";
import DynamicForm from "../dymnamicForm/dynamicForm";
import Loading from "../skeletoneLoading/Loading";
import { useState, useTransition } from "react";
import { useNotification } from "../../../../providers/notification-provider/notificationProvider";

export default function Container() {
  const { data, isLoading } = UseGetFormStructure();
  const { showNotification } = useNotification();

  const { mutate, isPending: mutatePending } = UseFormMutation();
  const [, startTransition] = useTransition();
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

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

  const handleFormSelect = (formId: string) => {
    startTransition(() => {
      setSelectedFormId(formId);
    });
  };

  const isPending = isLoading || !data;
  // Find the selected form based on the selectedFormId
  const selectedForm = data?.find((form) => form.formId === selectedFormId);

  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <Typography.Title level={3}>Insurances</Typography.Title>
          <Typography.Text strong>please select a form</Typography.Text>
          <Divider />

          {/* Dropdown to select a form */}
          <Select
            placeholder="Select a form"
            style={{ marginBottom: 24 }}
            onChange={handleFormSelect}
            value={selectedFormId}
          >
            {data.map((form) => (
              <Select.Option key={form.formId} value={form.formId}>
                {form.title}
              </Select.Option>
            ))}
          </Select>

          {/* Display the selected form */}
          {selectedForm && (
            <DynamicForm
              formStructure={selectedForm}
              onSubmit={handleSubmit}
              isLoading={mutatePending}
            />
          )}
        </>
      )}
    </div>
  );
}
