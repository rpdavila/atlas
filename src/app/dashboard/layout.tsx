import { Suspense } from "react";
import SideBar from "../components/sideBar/sideBar";
import Loading from "../components/loading/loading";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row w-full bg-slate-700 gap-2">
      <SideBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
