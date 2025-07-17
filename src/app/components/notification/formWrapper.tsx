"use client";

import { useActionState } from "react";
import { useTransition } from "react";
import { toast } from "react-hot-toast";
import Button from "@/app/components/button/button";

interface FormWrapperProps {
  action: (formData: FormData) => Promise<{ success: boolean; message: string }>
  children?: React.ReactNode
  submitButton: {
    name: string
    type: "submit" | "reset" | "button"
    disabled?: boolean
    danger?: boolean
    full?: boolean
    onClick?: () => void
    pendingName?: string
  }
  formRef?: React.RefObject<HTMLFormElement>
  className?: string
}

export default function FormWrapper({
  action,
  children,
  submitButton,
  formRef,
  className,
}: FormWrapperProps) {
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await action(formData)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result?.message)
    }
  }, null)

  return (
    <form
      action={(formData) => {
        startTransition(() => formAction(formData))
      }}
      ref={formRef}
      className={className}
    >
      {children}
      <Button
        type={submitButton.type}
        name={submitButton.name}
        danger={submitButton.danger}
        isPending={submitButton.disabled || isPending}
        pendingName={submitButton.pendingName}
      />
    </form>
  )
}