export interface FormField {
  id: string;
  label: string;
  type: string; // e.g., "text", "select", "radio", "date", "number", "checkbox", "group"
  required?: boolean;
  options?: string[]; // for select, radio, or checkbox fields
  dependsOn?: string; // for conditional fields
  endpoint?: string; // for dynamic options
  method?: string; // for dynamic options
  visibility?: {
    dependsOn: string;
    condition: string; // e.g., "equals"
    value: string;
  };
  dynamicOptions?: {
    dependsOn: string;
    endpoint: string;
    method: string;
  };
  validation?: {
    min?: number;
    max?: number;
    pattern?: string; // regex for validation
  };
  fields?: FormField[]; // for nested groups
}

export interface FormStructure {
  formId: string;
  title: string;
  fields: FormField[];
}
