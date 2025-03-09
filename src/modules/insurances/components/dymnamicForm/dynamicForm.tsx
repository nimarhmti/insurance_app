import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Radio, Checkbox, Button } from "antd";
import axios from "axios";
import { FormField, FormStructure } from "../../types";

interface DynamicFormProps {
  formStructure: FormStructure;
  onSubmit: (values: unknown) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formStructure,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  // state
  const [dynamicOptions, setDynamicOptions] = useState<{
    [key: string]: string[];
  }>({});
  const allValues = Form.useWatch([], form);

  // Fetch dynamic options with parent path support
  const fetchDynamicOptions = async (field: FormField, parentPath?: string) => {
    if (field.dynamicOptions) {
      const fullDependsOnPath = parentPath
        ? `${parentPath}.${field.dynamicOptions.dependsOn}`
        : field.dynamicOptions.dependsOn;

      const dependentValue = form.getFieldValue(fullDependsOnPath);

      if (dependentValue && field.dynamicOptions.endpoint) {
        const response = await axios.get(
          `${field.dynamicOptions.endpoint}?country=${dependentValue}`
        );
        setDynamicOptions((prev) => ({ ...prev, [field.id]: response.data }));
      }
    }
  };

  // Recursive render with parent path tracking
  const renderField = (field: FormField, parentPath?: string) => {
    const fieldPath = parentPath ? `${parentPath}.${field.id}` : field.id;

    switch (field.type) {
      case "text":
        return <Input />;
      case "date":
        return <DatePicker />;
      case "number":
        return <Input type="number" />;
      case "select":
        return (
          <Select
            options={(field.options || dynamicOptions[field.id] || []).map(
              (option) => ({
                label: option,
                value: option,
              })
            )}
            onFocus={() => fetchDynamicOptions(field, parentPath)}
          />
        );
      case "radio":
        return (
          <Radio.Group
            options={field.options?.map((option) => ({
              label: option,
              value: option,
            }))}
          />
        );
      case "checkbox":
        return (
          <Checkbox.Group
            options={field.options?.map((option) => ({
              label: option,
              value: option,
            }))}
          />
        );
      case "group":
        return (
          <div style={{ marginLeft: "16px" }}>
            {field.fields?.map((nestedField) => (
              <Form.Item
                key={nestedField.id}
                label={nestedField.label}
                name={fieldPath} // Use full path
                rules={[
                  {
                    required: nestedField.required,
                    message: `${nestedField.label} is required`,
                  },
                ]}
              >
                {renderField(nestedField, fieldPath)}
              </Form.Item>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Handle nested visibility checks
  const shouldRenderField = (field: FormField) => {
    if (!field.visibility) return true;
    const track = field.visibility?.dependsOn;
    if (allValues) {
      const dependentValue = allValues[track];
      return dependentValue === field.visibility.value;
    }
  };

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      {formStructure.fields.map((field) => {
        if (field.type === "group") {
          return (
            <div key={field.id}>
              {field.fields?.map(
                (nestedField) =>
                  shouldRenderField(nestedField) && (
                    <Form.Item
                      key={nestedField.id}
                      label={nestedField.label}
                      name={nestedField.id}
                      rules={[
                        {
                          required: nestedField.required,
                          message: `${nestedField.label} is required`,
                        },
                      ]}
                    >
                      {renderField(nestedField, field.id)}
                    </Form.Item>
                  )
              )}
            </div>
          );
        }

        return (
          shouldRenderField(field) && (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.id}
              rules={[
                {
                  required: field.required,
                  message: `${field.label} is required`,
                },
              ]}
            >
              {renderField(field)}
            </Form.Item>
          )
        );
      })}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DynamicForm;
