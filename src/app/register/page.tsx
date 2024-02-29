"use client";
import React, { useState } from "react";
import TextInput from "../components/input/customTextInput";
import Button from "../components/button/button";
import { useApp } from "../hooks/useApp";

type RegisterProps = {
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
};
export default function Register() {
  const app = useApp();
  const initialState: RegisterProps = {
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  };

  const [userData, setUserData] = useState<RegisterProps>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = async () => {
    await app?.emailPasswordAuth.registerUser({
      email: userData.email,
      password: userData.password,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center basis-3/4 bg-white mt-2 rounded-lg">
      <div className="flex flex-col w-1/2">
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
        <TextInput
          labelName="Confirm Password"
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          placeHolder="Confirm Password"
          onChange={handleChange}
        />
        <Button
          type="button"
          name="Register"
          marginTop="5"
          onClick={handleClick}
        />
      </div>
    </main>
  );
}
