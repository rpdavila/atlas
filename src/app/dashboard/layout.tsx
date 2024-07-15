import SideBar from "../components/sideBar/sideBar";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  return (
    <section className="flex flex-col  bg-slate-700 w-full sm:flex-row sm:justify-center md:w-full">
      <section className="hidden md:flex flex-row basis-1/4">
        <SideBar />
      </section>
      {children}
    </section>
  );
}
