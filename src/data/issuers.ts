export const issuersData = [
  { 
    id: "1", 
    name: "Apple Inc.", 
    ticker: "AAPL", 
    sector: "Technology", 
    creditScore: 95, 
    trend: "stable",
    marketCap: "$2.8T",
    revenue: "$394.3B",
    lastUpdated: "2024-01-15"
  },
  { 
    id: "2", 
    name: "Tesla Inc.", 
    ticker: "TSLA", 
    sector: "Automotive", 
    creditScore: 72, 
    trend: "improving",
    marketCap: "$789.2B",
    revenue: "$96.8B",
    lastUpdated: "2024-01-14"
  },
  { 
    id: "3", 
    name: "Bank of America", 
    ticker: "BAC", 
    sector: "Finance", 
    creditScore: 88, 
    trend: "declining",
    marketCap: "$245.7B",
    revenue: "$89.1B",
    lastUpdated: "2024-01-15"
  },
  { 
    id: "4", 
    name: "Microsoft Corporation", 
    ticker: "MSFT", 
    sector: "Technology", 
    creditScore: 93, 
    trend: "stable",
    marketCap: "$2.9T",
    revenue: "$211.9B",
    lastUpdated: "2024-01-15"
  },
  { 
    id: "5", 
    name: "Amazon.com Inc.", 
    ticker: "AMZN", 
    sector: "E-commerce", 
    creditScore: 87, 
    trend: "improving",
    marketCap: "$1.4T",
    revenue: "$574.8B",
    lastUpdated: "2024-01-14"
  },
  { 
    id: "6", 
    name: "JPMorgan Chase", 
    ticker: "JPM", 
    sector: "Finance", 
    creditScore: 91, 
    trend: "stable",
    marketCap: "$421.3B",
    revenue: "$128.7B",
    lastUpdated: "2024-01-15"
  },
  { 
    id: "7", 
    name: "Ford Motor Company", 
    ticker: "F", 
    sector: "Automotive", 
    creditScore: 58, 
    trend: "declining",
    marketCap: "$48.2B",
    revenue: "$156.2B",
    lastUpdated: "2024-01-13"
  },
  { 
    id: "8", 
    name: "Meta Platforms Inc.", 
    ticker: "META", 
    sector: "Technology", 
    creditScore: 84, 
    trend: "improving",
    marketCap: "$786.8B",
    revenue: "$134.9B",
    lastUpdated: "2024-01-15"
  }
];

export type Issuer = typeof issuersData[0];