
import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const useValidation = (schema: ValidationSchema) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = schema[name];
    if (!rule) return null;

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'Este campo es requerido';
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Debe tener al menos ${rule.minLength} caracteres`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `No puede tener más de ${rule.maxLength} caracteres`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      if (name === 'email') {
        return 'Por favor ingresa un email válido';
      }
      if (name === 'phone') {
        return 'Por favor ingresa un teléfono válido';
      }
      return 'Formato inválido';
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [schema]);

  const validate = useCallback((data: { [key: string]: any }): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(schema).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [schema, validateField]);

  const validateSingle = useCallback((name: string, value: any): boolean => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));
    setTouched(prev => ({ ...prev, [name]: true }));
    return !error;
  }, [validateField]);

  const clearError = useCallback((name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const setFieldTouched = useCallback((name: string, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  return {
    errors,
    touched,
    validate,
    validateSingle,
    clearError,
    clearAllErrors,
    setFieldTouched,
    hasErrors: Object.keys(errors).length > 0,
    getFieldError: (name: string) => errors[name],
    isFieldTouched: (name: string) => touched[name] || false
  };
};

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
};

// Common validation schemas
export const CommonSchemas = {
  login: {
    email: {
      required: true,
      pattern: ValidationPatterns.email
    },
    password: {
      required: true,
      minLength: 6
    }
  },
  register: {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: ValidationPatterns.email
    },
    password: {
      required: true,
      minLength: 8,
      pattern: ValidationPatterns.password
    },
    confirmPassword: {
      required: true,
      custom: (value: string, formData?: any) => {
        if (formData && value !== formData.password) {
          return 'Las contraseñas no coinciden';
        }
        return null;
      }
    }
  },
  profile: {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: ValidationPatterns.email
    },
    phone: {
      pattern: ValidationPatterns.phone
    }
  },
  checkout: {
    street: {
      required: true,
      minLength: 5
    },
    city: {
      required: true,
      minLength: 2
    },
    state: {
      required: true
    },
    zipCode: {
      required: true,
      pattern: ValidationPatterns.zipCode
    }
  }
};
