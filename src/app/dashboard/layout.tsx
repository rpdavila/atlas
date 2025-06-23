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
    <article className="flex justify-center min-h-screen overflow-hidden bg-slate-700 gap-4">
      <section className="hidden sm:block basis-1/4">
        <SideBar />
      </section>
      <section className="flex flex-col items-stretch mt-1 h-full w-full">
        {children}
      </section>
    </article>
  );
}
