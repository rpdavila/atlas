import SideBar from "../components/sideBar/sideBar";
import Loading from "../components/loading/loading";
import DashBoardMainPage from "@/app/dashboard/page";
export default function DashBoardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row w-full bg-slate-700 gap-2">
      <SideBar />
      <DashBoardMainPage>
        {children}
      </DashBoardMainPage>
    </section>
  );
}
