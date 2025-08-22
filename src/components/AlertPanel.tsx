import { useState, useEffect } from "react";
import { Bell, X, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  type: "warning" | "positive" | "negative";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function AlertPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      title: "Ford Motor Co. Credit Watch",
      message: "Credit score dropped below 60, requiring immediate attention",
      timestamp: "5 min ago",
      read: false
    },
    {
      id: "2", 
      type: "positive",
      title: "Tesla Inc. Improvement",
      message: "Credit score improved by 3 points this week",
      timestamp: "1 hour ago",
      read: false
    },
    {
      id: "3",
      type: "negative",
      title: "Sector Alert: Energy",
      message: "Energy sector showing declining trends across 3 companies",
      timestamp: "2 hours ago", 
      read: true
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = alerts.filter(alert => !alert.read).length;

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "positive":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-96 max-h-96 overflow-hidden z-50 shadow-lg">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Alerts</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No alerts
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer ${
                    !alert.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(alert.id)}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">
                          {alert.title}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAlert(alert.id);
                          }}
                          className="h-6 w-6 opacity-60 hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}