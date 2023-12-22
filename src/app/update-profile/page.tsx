"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Loading from "@/components/Loading/Loading";
import { RouterProtector } from "@/helpers/routerProtectorWithRole";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import { updateProfileSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
type FormValues = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
};

const UpdateProfile = () => {
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  const router = useRouter();
  const [updatedProfile] = useUpdateProfileMutation(undefined);
  const onSubmit: SubmitHandler<FormValues> = async (formData: any) => {
    const updatedData = {
      name: formData.name,
      email: formData.email,
    };
    if (data?.data?.email == updatedData.email) {
      delete updatedData.email;
    }
    const ans = window.confirm("Are you sure to update your profile?");
    if (ans) {
      try {
        const res: any = await updatedProfile(updatedData);
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
          Update Profile
          {isLoading && (
            <span className="ml-5 inline-block">
              <Loading />
            </span>
          )}
        </h1>
        <Form
          submitHandler={onSubmit}
          defaultValues={data?.data}
          resolver={yupResolver(updateProfileSchema)}
        >
          <div className="w-full my-3">
            <FormInput name="name" type="text" label="Updated Name" size="md" />
          </div>
          <div className="w-full my-3">
            <FormInput
              name="email"
              type="email"
              label="Updated Email"
              size="md"
            />
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

const UpdateProfileWithProtector = () => (
  <RouterProtector allowedRoles={["user"]}>
    <UpdateProfile />
  </RouterProtector>
);

export default UpdateProfileWithProtector;
