// src/typings/jquery-validation.d.ts

interface JQuery {
    validate(options?: any): JQueryValidation;
    valid(): boolean;
  }
  
  interface JQueryValidation {
    settings: any;
    form(): boolean;
    resetForm(): void;
  }
  