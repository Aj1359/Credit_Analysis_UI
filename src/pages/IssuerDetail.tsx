import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreHistoryChart } from "@/components/charts/ScoreHistoryChart";
import { FeatureImportanceChart } from "@/components/charts/FeatureImportanceChart";
import { issuersData } from "@/data/issuers";
import { scoreHistory, featureImportance, recentNews } from "@/data/chartData";

export default function IssuerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const issuer = issuersData.find(i => i.id === id);
  
  if (!issuer) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Issuer Not Found</h1>
              <Button onClick={() => navigate("/issuers")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Issuers
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-5 w-5 text-success" />;
      case "declining":
        return <TrendingDown className="h-5 w-5 text-destructive" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Low", color: "text-success", icon: CheckCircle };
    if (score >= 60) return { level: "Medium", color: "text-warning", icon: AlertTriangle };
    return { level: "High", color: "text-destructive", icon: AlertTriangle };
  };

  const risk = getRiskLevel(issuer.creditScore);
  const RiskIcon = risk.icon;

  return (
    <div className="min-h-screen bg-dashboard-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/issuers")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Issuers
            </Button>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{issuer.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline">{issuer.ticker}</Badge>
                  <Badge variant="secondary">{issuer.sector}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Last updated: {issuer.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Credit Score Display */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <CardTitle>Credit Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-bold mb-4" style={{
                  color: issuer.creditScore >= 80 ? 'hsl(var(--success))' : 
                         issuer.creditScore >= 60 ? 'hsl(var(--warning))' : 
                         'hsl(var(--destructive))'
                }}>
                  {issuer.creditScore}
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {getTrendIcon(issuer.trend)}
                  <span className="text-sm font-medium capitalize">{issuer.trend}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <RiskIcon className={`h-4 w-4 ${risk.color}`} />
                  <span className={`text-sm font-medium ${risk.color}`}>
                    {risk.level} Risk
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-2xl font-bold">{issuer.marketCap}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">{issuer.revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sector Rank</p>
                    <p className="text-2xl font-bold">#3</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating Outlook</p>
                    <p className="text-2xl font-bold capitalize">{issuer.trend}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Score History Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Score History</CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreHistoryChart data={scoreHistory} className="h-64" />
              </CardContent>
            </Card>

            {/* Feature Importance */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <FeatureImportanceChart data={featureImportance} className="h-64" />
              </CardContent>
            </Card>
          </div>

          {/* Recent News */}
          <Card>
            <CardHeader>
              <CardTitle>Recent News & Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <div
                    key={news.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      news.impact === "positive" ? "bg-success" :
                      news.impact === "negative" ? "bg-destructive" :
                      "bg-muted-foreground"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{news.title}</h4>
                        <span className="text-sm text-muted-foreground">{news.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{news.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}