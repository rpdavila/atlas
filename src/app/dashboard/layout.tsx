import SideBar from "../components/sideBar/sideBar";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  return (
    <section className="flex flex-col bg-slate-700 sm:flex-row w-full gap-2">
      <SideBar />
      {children}
    </section>
  );
}
