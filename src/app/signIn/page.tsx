"use client";
import { useRef } from "react";
import Button from "../components/button/button";
import { handleSignIn } from "@/actions/actions";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <div className="flex h-screen items-center justify-center">
      <article className="flex justify-center items-center w-full bg-slate-50 rounded-lg m-5 sm:w-1/3 h-56 gap-2 ">
        <section className="w-fit h-fit bg-white p-2 border-small rounded-md border-black">
          <form
            ref={ref}
            action={async () => {
              await handleSignIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button name="Sign in with Google" type="submit" icon={<FaGoogle />} />
          </form>
        </section>
        {/* <section className="flex flex-col w-full bg-white p-5 rounded-lg">
        <form
          ref={ref}
          className="flex flex-col justify-center items-center w-full gap-4 mt-20 sm:w-full md:w-full md:mt-2"
          action={async formData => {

          }}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"

          />
          <Button
            type="submit"
            name="Sign in"
            marginTop="5"
          />
        </form>
        <small className="flex flex-row justify-evenly">
          <span>
            Need an account? click{" "}
            <Link className="text-sky-500 hover:text-sky-700" href={"/register"}>
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
      </section> */}
      </article>
    </div>
  );
}
