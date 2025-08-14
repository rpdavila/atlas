import SideBar from "../components/sideBar/sideBar";
export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="flex md:flex-col lg:flex-row min-h-screen overflow-hidden bg-slate-700 gap-4">
      <section className="hidden md:flex lg:basis-1/4">
        <SideBar />
      </section>
      <section className="flex flex-col items-stretch justify-center h-full w-full lg:basis-3/4">
        {children}
      </section>
    </article>
  );
}
