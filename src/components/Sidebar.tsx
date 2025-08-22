import { 
  LayoutDashboard, 
  CreditCard, 
  Monitor, 
  BarChart3,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "#",
    active: true
  },
  {
    title: "Issuers",
    icon: CreditCard,
    href: "#",
    active: false
  },
  {
    title: "Monitor",
    icon: Monitor,
    href: "#",
    active: false
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "#",
    active: false
  }
];

const bottomItems = [
  {
    title: "Notifications",
    icon: Bell,
    href: "#"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#"
  },
  {
    title: "Sign Out",
    icon: LogOut,
    href: "#"
  }
];

export function Sidebar() {
  return (
    <div className="w-64 bg-sidebar-bg border-r border-border h-screen flex flex-col shadow-sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">CreditScore</h1>
            <p className="text-xs text-muted-foreground">Financial Platform</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                item.active
                  ? "bg-sidebar-active text-white shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </a>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.title}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-smooth"
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}