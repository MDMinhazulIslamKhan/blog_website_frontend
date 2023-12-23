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

export const updateProfileSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().min(4).max(30).required("Name is required"),
});

export const passwordUpdateSchema = yup.object().shape({
  oldPassword: yup.string().min(3).max(15).required("Password is required"),
  newPassword: yup.string().min(3).max(15).required("Password is required"),
});

export const createBlogSchema = yup.object().shape({
  title: yup.string().min(4).max(30).required("Title is required"),
  imgUrl: yup.mixed().test("is-file", "Image is required", (value: any) => {
    return value && value.length > 0;
  }),
});

export const updateBlogSchema = yup.object().shape({
  title: yup.string().min(4).max(30).required("Title is required"),
});
