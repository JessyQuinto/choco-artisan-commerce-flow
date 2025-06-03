
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useValidation, ValidationSchema } from "@/hooks/useValidation";

interface FormField {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "textarea";
  placeholder?: string;
  required?: boolean;
}

interface ValidatedFormProps {
  fields: FormField[];
  schema: ValidationSchema;
  onSubmit: (data: { [key: string]: any }) => void;
  submitLabel?: string;
  initialData?: { [key: string]: any };
  isLoading?: boolean;
  children?: ReactNode;
}

const ValidatedForm = ({
  fields,
  schema,
  onSubmit,
  submitLabel = "Enviar",
  initialData = {},
  isLoading = false,
  children
}: ValidatedFormProps) => {
  const { errors, validate, validateSingle, hasErrors } = useValidation(schema);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};
    
    fields.forEach(field => {
      data[field.name] = formData.get(field.name) as string;
    });

    if (validate(data)) {
      onSubmit(data);
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    validateSingle(name, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-primary-text">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              defaultValue={initialData[field.name] || ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className={`border-primary-secondary/30 focus:border-primary-action ${
                errors[field.name] ? "border-red-500" : ""
              }`}
            />
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              defaultValue={initialData[field.name] || ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className={`border-primary-secondary/30 focus:border-primary-action ${
                errors[field.name] ? "border-red-500" : ""
              }`}
            />
          )}
          
          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name]}</p>
          )}
        </div>
      ))}
      
      {children}
      
      <Button
        type="submit"
        disabled={hasErrors || isLoading}
        className="w-full bg-primary-action hover:bg-primary-action/90 text-white"
      >
        {isLoading ? "Cargando..." : submitLabel}
      </Button>
    </form>
  );
};

export default ValidatedForm;
