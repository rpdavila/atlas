
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

import StudentForm from "../components/forms/studentForm";
import InstrumentForm from "../components/forms/instrumentForm";

export default function Tools() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center basis-3/4 bg-white mt-2 rounded-lg">
      <div className="max-w-5xl w-full items-center justify-center font-mono lg:flex">
        <p>Data to display</p>
      </div>
    </main>
  );
}
