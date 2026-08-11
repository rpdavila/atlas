"use client";
import { useActionState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { RentStatus } from "@prisma/client";
import { toast } from "react-hot-toast";

import { useAppDispatch } from "@/lib/ReduxSSR/hooks";
import { setDropDownList } from "@/lib/ReduxSSR/features/studentListSlice";
import { assignStudentToInstrument, getDropDownList, unassignStudentFromInstrument } from "@/actions/actions";

export function useInstrumentAssignmentAction() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  const [, formAction] = useActionState(async (_: void | null, formData: FormData) => {
    const instrumentId = formData.get("instrumentId") as string;
    const studentId = formData.get("studentId") as string;
    const rentStatus = formData.get("rentStatus") as RentStatus;

    try {
      const response =
        rentStatus === "Rented"
          ? await unassignStudentFromInstrument(instrumentId, studentId)
          : await assignStudentToInstrument(formData, instrumentId);

      const updatedDropDownList = await getDropDownList(session.data?.user?.id as string);
      dispatch(setDropDownList(updatedDropDownList));

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error processing request");
    }
  }, null);

  const handleAssignmentAction = (formData: FormData) => startTransition(() => formAction(formData));

  return { handleAssignmentAction, isPending };
}
