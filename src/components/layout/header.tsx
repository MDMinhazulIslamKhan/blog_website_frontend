"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const logoutUser = () => {
    removeUserInfo(authKey);
    window.alert("Logout Successfully!!!");
    dispatch(logout());
    router.push("/");
  };
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="bg-secondary sm:px-16 px-6 h-20 w-full flex items-center py-5 fixed top-0 z-10">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <p className="text-3xl text-primary font-extrabold font-serif">
            My Blog
          </p>
        </Link>
        <ul className="list-none hidden sm:flex mr-10 flex-row gap-4 md:gap-10">
          <li className="hover:text-white text-[18px] font-medium cursor-pointer text-primary">
            <Link href="/about">About Us</Link>
          </li>
          <li className="hover:text-white text-[18px] font-medium cursor-pointer text-primary">
            <p className="absolute">
              {isLogin ? (
                <div className="relative">
                  <div
                    className="w-[28px] h-[28px] object-contain cursor-pointer"
                    onClick={() => setToggle(!toggle)}
                  >
                    {toggle ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-primary hover:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-primary hover:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </div>
                  {toggle && (
                    <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/"
                          className="block px-4 py-2 text-sm text-primary hover:bg-gray-100"
                        >
                          Create Blog
                        </Link>
                        <Link
                          href="/"
                          className="block px-4 py-2 text-sm text-primary hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                        <p
                          onClick={() => logoutUser()}
                          className="block px-4 py-2 text-sm text-primary hover:bg-gray-100"
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </p>
          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </div>
          <div
            className={`fixed sm:hidden inset-y-0 right-0 z-50 top-20 h-36 rounded-bl-lg bg-neutral w-36 shadow-md transform overflow-y-auto transition-transform duration-500 ease-in-out flex justify-start items-start flex-col py-2 gap-2 ${
              toggle ? "overflow-hidden" : "translate-x-full"
            }`}
          >
            <div
              className="text-primary text-md font-medium pl-5 w-full my cursor-pointer"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <Link href="/about">About Us</Link>
            </div>
            {isLogin ? (
              <>
                <div
                  className="text-primary text-md font-medium  pl-5 w-full my cursor-pointer"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <Link href="/about">Create Blog</Link>
                </div>
                <div
                  className="text-primary text-md font-medium  pl-5 w-full my cursor-pointer"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <Link href="/about">My Profile</Link>
                </div>
                <div
                  className="text-primary text-md font-medium  pl-5 w-full my cursor-pointer"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <p onClick={() => logoutUser()}>Logout</p>
                </div>
              </>
            ) : (
              <div
                className="text-primary text-md font-medium  pl-5 w-full my cursor-pointer"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <Link href="/login">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
