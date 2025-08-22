import { MetricCard } from "./MetricCard";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  {
    title: "Average Credit Score",
    value: "742",
    change: "+12 points",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "vs last month"
  },
  {
    title: "Active Accounts",
    value: "1,284",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Users,
    description: "this quarter"
  },
  {
    title: "High Risk Accounts",
    value: "23",
    change: "-8.1%",
    changeType: "positive" as const,
    icon: AlertTriangle,
    description: "decreased"
  },
  {
    title: "Total Credit Volume",
    value: "$2.4M",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "this month"
  }
];

const creditScoreDistribution = [
  { range: "Excellent (800-850)", count: 234, percentage: 18.2, color: "success" },
  { range: "Very Good (740-799)", count: 412, percentage: 32.1, color: "success" },
  { range: "Good (670-739)", count: 398, percentage: 31.0, color: "primary" },
  { range: "Fair (580-669)", count: 187, percentage: 14.6, color: "warning" },
  { range: "Poor (300-579)", count: 53, percentage: 4.1, color: "danger" }
];

const recentActivities = [
  {
    type: "positive",
    message: "Credit score improved for John Smith",
    time: "2 hours ago",
    score: "+25 points"
  },
  {
    type: "negative",
    message: "Payment default detected for Account #4521",
    time: "4 hours ago",
    score: "High Risk"
  },
  {
    type: "neutral",
    message: "New credit application processed",
    time: "6 hours ago",
    score: "Review Required"
  }
];

export function DashboardGrid() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Second Row - Detailed Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Score Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Credit Score Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {creditScoreDistribution.map((item) => (
              <div key={item.range} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{item.range}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                  </div>
                </div>
                <Progress 
                  value={item.percentage} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'positive' ? 'bg-success' :
                  activity.type === 'negative' ? 'bg-danger' : 'bg-muted-foreground'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      activity.type === 'positive' ? 'bg-success/10 text-success' :
                      activity.type === 'negative' ? 'bg-danger/10 text-danger' : 'bg-muted text-muted-foreground'
                    }`}>
                      {activity.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}