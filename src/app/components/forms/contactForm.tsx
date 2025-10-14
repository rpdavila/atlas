"use client";
// react imports
import { useRef } from "react";
// component imports
import FormWrapper from "../notification/formWrapper";
//heroui imports
import { Input, Textarea } from "@heroui/react";

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <FormWrapper
        //TO DO: create server action to handle form submission
        action={async (formData: FormData) => {
          ref.current?.reset();
          const name = formData.get("name");
          const email = formData.get("email");
          const message = formData.get("message");
          console.log({"name": name, "email": email, "message": message })

          return { success: true, message: "Message sent successfully" };
        }}
        formRef={ref}
        submitButton={{
          name: "Submit",
          type: "submit",
          danger: false,
          disabled: false,
          
        }}
        className="flex flex-col justify-center items-center self-center justify-self-center w-full gap-4 mt-20 sm:w-2/3 md:w-2/3 md:mt-2"
    >
      <Input
        name="name"
        label="Name"
        labelPlacement="inside"
        type="text"
      />

      <Input
        name="email"
        label="Email"
        labelPlacement="inside"
        type="email"
      />

      <Textarea
        name="message"
        label="Message"
        labelPlacement="inside"
      />

    </FormWrapper>
  )
}