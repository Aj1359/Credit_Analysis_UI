import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wifi, WifiOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { recentUpdates } from "@/data/chartData";

export function RealtimeUpdates() {
  const [updates, setUpdates] = useState(recentUpdates);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const companies = ["Apple Inc.", "Tesla Inc.", "Microsoft Corp.", "Amazon.com", "Meta Platforms"];
      const randomCompany = companies[Math.floor(Math.random() * companies.length)];
      const changeValue = Math.floor(Math.random() * 6) - 2; // -2 to +3
      const type = changeValue >= 0 ? "positive" : "negative";
      const sign = changeValue >= 0 ? "+" : "";
      
      const newUpdate = {
        id: Date.now().toString(),
        time: "Just now",
        company: randomCompany,
        change: `${sign}${changeValue} point${Math.abs(changeValue) !== 1 ? 's' : ''}`,
        type
      };

      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);

      // Show toast notification for significant changes
      if (Math.abs(changeValue) >= 2) {
        toast({
          title: `${randomCompany} Score Update`,
          description: `Credit score changed by ${sign}${changeValue} points`,
          variant: changeValue < 0 ? "destructive" : "default"
        });
      }
    }, 15000); // Update every 15 seconds

    // Simulate connection status changes
    const connectionInterval = setInterval(() => {
      setIsConnected(prev => {
        if (!prev) return true; // Always reconnect
        return Math.random() > 0.1; // 10% chance of disconnection
      });
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(connectionInterval);
    };
  }, []);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Live Updates</h3>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4 text-success" />
              <Badge variant="outline" className="text-success border-success">
                Connected
              </Badge>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-destructive" />
              <Badge variant="outline" className="text-destructive border-destructive">
                Reconnecting...
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {updates.map((update) => (
          <div
            key={update.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              {update.type === "positive" ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <div>
                <p className="text-sm font-medium">{update.company}</p>
                <p className="text-xs text-muted-foreground">{update.time}</p>
              </div>
            </div>
            <Badge 
              variant={update.type === "positive" ? "default" : "destructive"}
              className={update.type === "positive" ? "bg-success text-success-foreground" : ""}
            >
              {update.change}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}