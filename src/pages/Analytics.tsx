import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { FeatureImportanceChart } from "@/components/charts/FeatureImportanceChart";
import { SectorDistributionChart } from "@/components/charts/SectorDistributionChart";
import { sectorPerformance, sectorDistribution, featureImportance } from "@/data/chartData";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

export default function Analytics() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date()
  });
  const [selectedSector, setSelectedSector] = useState<string>("all");

  const exportData = () => {
    const data = {
      sectorPerformance,
      sectorDistribution,
      dateRange,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `credit-analytics-${format(new Date(), "yyyy-MM-dd")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
                <p className="text-muted-foreground">Comprehensive credit risk analysis and benchmarking</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Date Range Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-auto justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Pick a date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>

                {/* Sector Filter */}
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export Button */}
                <Button onClick={exportData} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-3xl font-bold">82</p>
                  </div>
                  <Badge variant="default" className="bg-success text-success-foreground">
                    +2.1%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Risk Companies</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <Badge variant="destructive">
                    -1 from last month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Improving Trends</p>
                    <p className="text-3xl font-bold">67%</p>
                  </div>
                  <Badge variant="default" className="bg-success text-success-foreground">
                    +5.2%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Portfolio Risk</p>
                    <p className="text-3xl font-bold">Medium</p>
                  </div>
                  <Badge variant="outline" className="text-warning border-warning">
                    Stable
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sector Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorPerformance.map((sector) => (
                    <div key={sector.sector} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{
                          backgroundColor: sector.avgScore >= 80 ? 'hsl(var(--success))' : 
                                         sector.avgScore >= 60 ? 'hsl(var(--warning))' : 
                                         'hsl(var(--destructive))'
                        }} />
                        <div>
                          <p className="font-medium">{sector.sector}</p>
                          <p className="text-sm text-muted-foreground">{sector.count} companies</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{sector.avgScore}</p>
                        <p className="text-sm text-muted-foreground">Avg Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sector Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <SectorDistributionChart data={sectorDistribution} className="h-80" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feature Importance */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <FeatureImportanceChart data={featureImportance} className="h-64" />
              </CardContent>
            </Card>

            {/* Industry Benchmarks */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <span className="font-medium">S&P 500 Average</span>
                    <Badge variant="outline">78</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <span className="font-medium">Industry Leaders</span>
                    <Badge variant="outline">92</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <span className="font-medium">Investment Grade Threshold</span>
                    <Badge variant="outline">70</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <span className="font-medium">Your Portfolio</span>
                    <Badge variant="default" className="bg-primary text-primary-foreground">82</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}