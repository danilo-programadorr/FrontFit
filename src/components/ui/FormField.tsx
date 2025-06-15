import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  id?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  id,
  error,
  required = false,
  className = '',
  children,
}) => {
  const fieldId = id || name;

  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={fieldId} 
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormField;