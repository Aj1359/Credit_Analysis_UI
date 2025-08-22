import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  description 
}: MetricCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-card cursor-pointer bg-gradient-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    changeType === "positive" && "text-metric-positive",
                    changeType === "negative" && "text-metric-negative",
                    changeType === "neutral" && "text-metric-neutral"
                  )}
                >
                  {change}
                </span>
                {description && (
                  <span className="text-xs text-muted-foreground">{description}</span>
                )}
              </div>
            </div>
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            changeType === "positive" && "bg-success/10",
            changeType === "negative" && "bg-danger/10",
            changeType === "neutral" && "bg-muted"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              changeType === "positive" && "text-success",
              changeType === "negative" && "text-danger",
              changeType === "neutral" && "text-muted-foreground"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}