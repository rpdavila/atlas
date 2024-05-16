import SideBar from "../components/sideBar/sideBar";
import DashBoardMainPage from "./page";
export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-row w-full bg-slate-700 gap-2">
      <SideBar />      
      {children}      
    </section>
  );
}
