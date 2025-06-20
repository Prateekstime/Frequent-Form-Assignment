import React, { createContext, useState } from "react";


export const FormContext = createContext();


export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    customGender: "",
    currentPassword: "",
    newPassword: "",
    strength: "",

  });


  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
