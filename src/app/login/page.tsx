"use client";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeUserInfo } from "@/services/auth.service";
import { useUserLoginMutation } from "@/redux/api/authApi";
import Form from "@/components/Forms/Form";
import { loginSchema } from "@/schemas/validationSchema";
import FormInput from "@/components/Forms/FormInput";
import PassWordInput from "@/components/Forms/PasswordInput";
import { RouterProtector } from "@/helpers/routerProtectorWithRole";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/authSlice";

type FormValues = {
  email: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userLogin] = useUserLoginMutation(undefined);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.data?.accessToken?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken?.accessToken });
        window.alert("User logged in successfully!");
        dispatch(login());
        router.back();
      } else {
        window.alert(res.message);
      }
    } catch (error) {
      window.alert("Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center sm:mt-40 sm:my-0 my-5">
      <div className="w-full max-w-sm shadow-2xl rounded-xl pb-10">
        <div className="mt-8 mx-10">
          <h2 className="text-primary mt-2 mb-5 font-bold text-3xl font-serif text-center">
            Login
          </h2>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div className="w-full max-w-xs my-3">
              <FormInput
                name="email"
                type="email"
                label="Your Email"
                required
              />
            </div>
            <div className="w-full max-w-xs my-3">
              <PassWordInput name="password" label="Password" />
            </div>
            <div className="w-full max-w-xs mt-5">
              <button
                type="submit"
                className="text-white hover:bg-secondary hover:text-primary bg-primary font-bold rounded-lg block w-full p-2"
              >
                Login
              </button>
            </div>
          </Form>
          <small className="text-xs text-center">
            New to My Blog?{" "}
            <Link
              className="text-secondary inline-block hover:text-primary"
              href="/registration"
            >
              Create new account
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};
const LoginWithProtector = () => (
  <RouterProtector allowedRoles={null}>
    <Login />
  </RouterProtector>
);

export default LoginWithProtector;
