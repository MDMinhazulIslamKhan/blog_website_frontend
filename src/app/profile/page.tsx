"use client";

import Loading from "@/components/Loading/Loading";
import { RouterProtector } from "@/helpers/routerProtectorWithRole";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import Link from "next/link";
import React from "react";

const MyProfile = () => {
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  return (
    <div>
      <h1 className="text-primary mt-2 mb-5 font-bold text-3xl font-serif text-center pt-20">
        My Profile
        {isLoading && (
          <div className="ml-5 inline-block">
            <Loading />
          </div>
        )}
      </h1>
      <div className="bg-white items-center font-semibold text-center p-10">
        <p className="mb-3">
          <span className="font-bold text-primary">Name: </span>
          {data?.data?.name}
        </p>
        <p className="mb-3">
          <span className="font-bold text-primary">Email: </span>
          {data?.data?.email}
        </p>
        <div className="flex sm:flex-row flex-col justify-evenly mx-auto mt-20">
          <Link
            className="text-white hover:bg-secondary hover:text-primary bg-primary font-bold rounded-lg py-2 px-5"
            href="/update-profile"
          >
            Update Profile
          </Link>
          <Link
            className="text-white hover:bg-secondary hover:text-primary bg-primary font-bold rounded-lg py-2 px-5 mt-5 sm:mt-0"
            href="/change-password"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoginWithProtector = () => (
  <RouterProtector allowedRoles={["user"]}>
    <MyProfile />
  </RouterProtector>
);

export default LoginWithProtector;
