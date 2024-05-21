export const dynamic = "force-dynamic";
import SideBar from "../components/sideBar/sideBar";
import { getStudents } from "../utilities/mongodb";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  const displayStudents = await getStudents();
  return (
    <section className="flex flex-row w-full bg-slate-700 gap-2">
      <SideBar />
      {children}
    </section>
  );
}
