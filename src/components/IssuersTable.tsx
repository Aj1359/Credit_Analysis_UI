import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Search, TrendingUp, TrendingDown, Minus, ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { issuersData, type Issuer } from "@/data/issuers";

type SortField = keyof Issuer;
type SortDirection = "asc" | "desc" | null;

function getCreditScoreColor(score: number) {
  if (score >= 80) return "success";
  if (score >= 60) return "warning";
  return "danger";
}

function getCreditScoreBgColor(score: number) {
  if (score >= 80) return "bg-success/10 text-success";
  if (score >= 60) return "bg-yellow-500/10 text-yellow-600";
  return "bg-danger/10 text-danger";
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case "improving":
      return <TrendingUp className="w-4 h-4 text-success" />;
    case "declining":
      return <TrendingDown className="w-4 h-4 text-danger" />;
    default:
      return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case "improving":
      return "text-success";
    case "declining":
      return "text-danger";
    default:
      return "text-muted-foreground";
  }
}

export function IssuersTable() {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof Issuer | null>("creditScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedData = useMemo(() => {
    let filtered = issuersData.filter(
      (issuer) =>
        issuer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issuer.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issuer.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        
        if (sortDirection === "asc") {
          return aString.localeCompare(bString);
        }
        return bString.localeCompare(aString);
      });
    }

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Issuer) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc"
      );
      if (sortDirection === "desc") {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Issuer) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="w-4 h-4 text-primary" />;
    }
    if (sortDirection === "desc") {
      return <ArrowDown className="w-4 h-4 text-primary" />;
    }
    return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
  };


  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>Credit Issuers</span>
            <Badge variant="secondary">{filteredAndSortedData.length} companies</Badge>
          </CardTitle>
          
          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search companies, tickers, sectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    onClick={() => handleSort("name")}
                  >
                    Company
                    {getSortIcon("name")}
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    onClick={() => handleSort("ticker")}
                  >
                    Ticker
                    {getSortIcon("ticker")}
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    onClick={() => handleSort("sector")}
                  >
                    Sector
                    {getSortIcon("sector")}
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    onClick={() => handleSort("creditScore")}
                  >
                    Credit Score
                    {getSortIcon("creditScore")}
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    onClick={() => handleSort("trend")}
                  >
                    Trend
                    {getSortIcon("trend")}
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    onClick={() => handleSort("marketCap")}
                  >
                    Market Cap
                    {getSortIcon("marketCap")}
                  </Button>
                </th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((issuer) => (
                <tr
                  key={issuer.id}
                  className="border-b border-border hover:bg-muted/50 cursor-pointer transition-smooth"
                  onClick={() => navigate(`/issuer/${issuer.id}`)}
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{issuer.name}</p>
                      <p className="text-sm text-muted-foreground">Revenue: {issuer.revenue}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="font-mono">
                      {issuer.ticker}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{issuer.sector}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        "text-lg font-bold px-3 py-1 rounded-full",
                        getCreditScoreBgColor(issuer.creditScore)
                      )}>
                        {issuer.creditScore}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(issuer.trend)}
                      <span className={cn("text-sm capitalize", getTrendColor(issuer.trend))}>
                        {issuer.trend}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{issuer.marketCap}</span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/issuer/${issuer.id}`);
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No issuers found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}