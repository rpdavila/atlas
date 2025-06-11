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
    <section className="container mx-auto h-auto min-h-screen bg-slate-700 w-full grid grid-cols-1 sm:grid-cols-12 gap-4">
      <section className="hidden sm:block sm:col-span-3">
        <SideBar />
      </section>
      <section className="col-span-1 sm:col-span-9 p-2">
        {children}
      </section>
    </section>
  );
}
