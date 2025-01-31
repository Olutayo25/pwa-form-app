import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function Form({ formFields, onSubmit }) {
  const [formData, setFormData] = useState(formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formFields.map((field, index) => (
        <div key={index}>
          {field.type === "select" ? (
            <Select name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required}>
              <option value="">{field.placeholder}</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </Select>
          ) : (
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}
