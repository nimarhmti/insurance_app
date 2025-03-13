import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Button,
  Card,
  Space,
} from "antd";
import { FormField, FormStructure } from "../../types";
import api from "../../../../config/axios";
import { Rule } from "antd/es/form";

interface DynamicFormProps {
  formStructure: FormStructure[];
  isLoading: boolean;
  onSubmit: (values: unknown) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formStructure,
  onSubmit,
  isLoading,
}) => {
  const [form] = Form.useForm();

  // state
  const [dynamicOptions, setDynamicOptions] = useState<{
    [key: string]: string[];
  }>({});
  const allValues = Form.useWatch([], form);

  // Fetch dynamic options with parent path support
  const fetchDynamicOptions = async (field: FormField) => {
    if (field.dynamicOptions) {
      const fullDependsOnPath = field.dynamicOptions.dependsOn;
      const dependentValue = form.getFieldValue(fullDependsOnPath);

      if (dependentValue && field.dynamicOptions.endpoint) {
        const response = await api.get(
          `${field.dynamicOptions.endpoint}?${fullDependsOnPath}=${dependentValue}`
        );
        const result = response.data.states;
        setDynamicOptions((prev) => ({ ...prev, [field.id]: result }));
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
        return (
          <DatePicker
            format={{
              format: "YYYY-MM-DD",
              type: "mask",
            }}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            // Normalize the value to ensure it's a number
            onChange={(e) => {
              const { value, id } = e.target;
              form.setFieldsValue({ [id]: Number(value) });
            }}
          />
        );
      case "select":
        return (
          <Select
            options={(field.options || dynamicOptions[field.id] || []).map(
              (option) => ({
                label: option,
                value: option,
              })
            )}
            onFocus={() => fetchDynamicOptions(field)}
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
                rules={getValidationRules(nestedField)} // Add validation rules
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

  // Get validation rules based on the field's validation object
  const getValidationRules = (field: FormField): Rule[] => {
    const rules: Rule[] = [];

    // Required rule
    if (field.required) {
      rules.push({
        required: true,
        message: `${field.label} is required`,
      });
    }

    // Min and max validation for numbers
    if (field.type === "number" && field.validation) {
      if (field.validation.min !== undefined) {
        rules.push({
          type: "number",
          min: field.validation.min,
          message: `${field.label} must be at least ${field.validation.min}`,
        });
      }
      if (field.validation.max !== undefined) {
        rules.push({
          type: "number",
          max: field.validation.max,
          message: `${field.label} must be at most ${field.validation.max}`,
        });
      }
    }

    // Pattern validation for text fields
    if (field.type === "text" && field.validation?.pattern) {
      rules.push({
        pattern: new RegExp(field.validation.pattern),
        message: `${field.label} does not match the required pattern`,
      });
    }

    return rules;
  };

  // Reset the form
  const onReset = () => {
    form.resetFields();
  };

  console.log(allValues);
  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {formStructure.map(({ fields, formId, title }) => (
          <Card title={title} size="default" key={formId}>
            {fields.map((field) => {
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
                            rules={getValidationRules(nestedField)} // Add validation rules
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
                    rules={getValidationRules(field)} // Add validation rules
                  >
                    {renderField(field)}
                  </Form.Item>
                )
              );
            })}
          </Card>
        ))}
      </Space>
      <Space style={{ marginTop: "2rem" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
        >
          Submit
        </Button>
        <Button type="default" htmlType="button" size="large" onClick={onReset}>
          Reset
        </Button>
      </Space>
    </Form>
  );
};

export default DynamicForm;
