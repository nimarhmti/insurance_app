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
  Row,
  Col,
} from "antd";
import { FormField, FormStructure } from "../../types";
import api from "../../../../config/axios";

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
  const [dynamicOptions, setDynamicOptions] = useState<{
    [key: string]: string[];
  }>({});
  const allValues = Form.useWatch([], form);

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

  const renderField = (field: FormField, parentPath?: string) => {
    const fieldPath = parentPath ? `${parentPath}.${field.id}` : field.id;

    switch (field.type) {
      case "text":
        return <Input />;
      case "date":
        return <DatePicker format="YYYY-MM-DD" />;
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
            <Row gutter={[16, 16]}>
              {field.fields?.map((nestedField) => {
                if (!shouldRenderField(nestedField)) return null;
                const nestedFieldPath = `${fieldPath}.${nestedField.id}`;
                return (
                  <Col xs={24} sm={8} key={nestedField.id}>
                    <Form.Item
                      label={nestedField.label}
                      name={nestedFieldPath}
                      rules={[
                        {
                          required: nestedField.required,
                          message: `${nestedField.label} is required`,
                        },
                      ]}
                    >
                      {renderField(nestedField, fieldPath)}
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  const shouldRenderField = (field: FormField) => {
    if (!field.visibility) return true;
    const track = field.visibility?.dependsOn;
    if (allValues) {
      const dependentValue = allValues[track];
      return dependentValue === field.visibility.value;
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {formStructure.map(({ fields, formId, title }) => (
          <Card title={title} size="default" key={formId}>
            <Row gutter={[16, 16]}>
              {fields.map((field) => (
                <Col
                  xs={24}
                  sm={field.type === "group" ? 24 : 8}
                  key={field.id}
                >
                  {field.type === "group"
                    ? renderField(field)
                    : shouldRenderField(field) && (
                        <Form.Item
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
                      )}
                </Col>
              ))}
            </Row>
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
