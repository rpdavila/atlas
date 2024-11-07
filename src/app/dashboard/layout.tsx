import SideBar from "../components/sideBar/sideBar";
import { auth } from "@/auth";
import { permanentRedirect } from "next/navigation";
export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    permanentRedirect("/signIn");
  }
  return (
    <section className=" container flex flex-col h-full bg-slate-700 w-full sm:grid grid-cols-11 grid-rows-6 gap-2">
      <section className="hidden sm:grid col-start-1 col-end-4">
        <SideBar />
      </section>
      <section className="sm:col-start-4 row-span-6 col-span-11 m-2">
        {children}
      </section>
    </section>
  );
}
