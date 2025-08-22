import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardGrid } from "@/components/DashboardGrid";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-dashboard-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6">
          <DashboardGrid />
        </main>
      </div>
    </div>
  );
}