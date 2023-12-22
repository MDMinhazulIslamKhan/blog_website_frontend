import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(3).max(15).required("Password is required"),
});

export const registrationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(3).max(15).required("Password is required"),
  name: yup.string().min(4).max(30).required("Name is required"),
});
