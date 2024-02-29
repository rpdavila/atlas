"use client";
import { useState } from "react";

import Link from "next/link";

import TextInput from "../components/input/customTextInput";
import Button from "../components/button/button";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/features/userSlice";

type SignInProps = {
  email: string;
  password: string;
  loading: boolean;
};
export default function SignIn() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);

  const initialState: SignInProps = {
    email: "",
    password: "",
    loading: false,
  };

  const [userData, setUserData] = useState<SignInProps>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = async () => {
    dispatch(loginUser({ email: userData.email, password: userData.password }));
    setUserData({ ...userData, email: "", password: "", loading: false });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center basis-3/4 bg-white mt-2 rounded-lg">
      <section className="flex flex-col w-1/2">
        <TextInput
          labelName="Email"
          type="email"
          name="email"
          value={userData.email}
          placeHolder="Email"
          onChange={handleChange}
        />
        <TextInput
          labelName="Password"
          type="password"
          name="password"
          value={userData.password}
          placeHolder="Password"
          onChange={handleChange}
        />
        <Button
          type="button"
          name={
            userData.loading
              ? "Logging In"
              : isLoggedIn
              ? "Logged In"
              : "Sign In"
          }
          marginTop="5"
          onClick={handleClick}
          disabled={isLoggedIn}
          disabledColor={isLoggedIn}
        />
        <small className="flex flex-row justify-evenly">
          <span>
            Need an account? click{" "}
            <Link
              className="text-sky-500 hover:text-sky-700"
              href={"/register"}
            >
              here
            </Link>
          </span>
          <p>
            Forgot your password? click{" "}
            <Link
              className="text-sky-500 hover:text-sky-700"
              href={"/resetPassword"}
            >
              here
            </Link>
          </p>
        </small>
      </section>
    </main>
  );
}
