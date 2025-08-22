import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Left side - Welcome message */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Good morning, Alex</h2>
        <p className="text-sm text-muted-foreground">Here's your credit portfolio overview</p>
      </div>

      {/* Center - Search bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search credit reports, issuers..."
            className="pl-10 bg-background border-border focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Right side - Notifications and profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-danger">
            3
          </Badge>
        </Button>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Alex Morgan</p>
            <p className="text-xs text-muted-foreground">Credit Analyst</p>
          </div>
          <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}