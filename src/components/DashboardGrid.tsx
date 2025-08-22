import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreHistoryChart } from "./charts/ScoreHistoryChart";
import { SectorDistributionChart } from "./charts/SectorDistributionChart";
import { RealtimeUpdates } from "./RealtimeUpdates";
import { scoreHistory, sectorDistribution } from "@/data/chartData";

export function DashboardGrid() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Average Credit Score"
          value="82"
          change="+2.1%"
          changeType="positive"
          icon={() => <div />}
          description="Portfolio average"
        />
        <MetricCard
          title="High Risk Accounts"
          value="12"
          change="-3"
          changeType="positive"
          icon={() => <div />}
          description="Score below 60"
        />
        <MetricCard
          title="Improving Trends"
          value="67%"
          change="+5.2%"
          changeType="positive"
          icon={() => <div />}
          description="Companies improving"
        />
        <MetricCard
          title="Total Monitored"
          value="247"
          change="+12"
          changeType="positive"
          icon={() => <div />}
          description="Active accounts"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreHistoryChart data={scoreHistory} className="h-64" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SectorDistributionChart data={sectorDistribution} className="h-64" />
          </CardContent>
        </Card>
      </div>

      {/* Real-time Updates */}
      <RealtimeUpdates />
    </div>
  );
}