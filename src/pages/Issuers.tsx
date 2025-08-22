import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { IssuersTable } from "@/components/IssuersTable";

export default function Issuers() {
  return (
    <div className="min-h-screen bg-dashboard-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Credit Issuers</h1>
            <p className="text-muted-foreground">Monitor and analyze credit scores for public companies</p>
          </div>
          <IssuersTable />
        </main>
      </div>
    </div>
  );
}