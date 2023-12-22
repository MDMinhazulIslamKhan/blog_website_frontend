"use client";
import Form from "@/components/Forms/Form";
import PassWordInput from "@/components/Forms/PasswordInput";
import Loading from "@/components/Loading/Loading";
import { RouterProtector } from "@/helpers/routerProtectorWithRole";
import { useUpdatePasswordMutation } from "@/redux/api/authApi";
import { passwordUpdateSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const UpdatePassword = () => {
  const router = useRouter();
  const [updatePassword] = useUpdatePasswordMutation(undefined);
  const onSubmit: SubmitHandler<FormValues> = async (formData: FormValues) => {
    const ans = window.confirm("Are you sure to change your password?");
    if (ans) {
      try {
        const res: any = await updatePassword(formData);
        window.alert(res?.data?.message);
        if (res?.data?.statusCode == 200) {
          router.push("/profile");
        }
      } catch (error) {
        window.alert("Something went wrong");
        router.push("/profile");
      }
    } else return;
  };
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-sm w-full mx-3">
        <h1 className="text-primary mt-2 mb-5 font-bold text-3xl font-serif text-center pt-20">
          Change password
        </h1>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(passwordUpdateSchema)}
        >
          <div className="w-full my-3">
            <PassWordInput name="oldPassword" label="Old Password" size="md" />
          </div>
          <div className="w-full my-3">
            <PassWordInput name="newPassword" label="New Password" size="md" />
          </div>
          <div className="w-full mt-6">
            <button
              type="submit"
              className="text-white hover:bg-secondary hover:text-primary bg-primary font-bold rounded-lg w-full max-w-sm p-2"
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const UpdatePasswordWithProtector = () => (
  <RouterProtector allowedRoles={["user"]}>
    <UpdatePassword />
  </RouterProtector>
);

export default UpdatePasswordWithProtector;
