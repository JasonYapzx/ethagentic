"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface StockDecreaseData {
  amount: string;
  timestamp: string;
  itemId: string;
}

interface Item {
  itemId: string;
  name: string;
  price: string;
  quantity: string;
  threshold: string;
  supplier: { name: string; avgDeliveryTime: string };
}

interface ChartData {
  date: string;
  [key: string]: number | string;
}

const StockDecreaseHistory: React.FC<{
  data: StockDecreaseData[];
  items: Item[];
}> = ({ data, items }) => {
  // Create a mapping of itemId to item name
  const itemNameMap = Object.fromEntries(
    items.map((item) => [item.itemId, item.name])
  );

  const processData = (rawData: StockDecreaseData[]): ChartData[] => {
    const sortedData = [...rawData].sort(
      (a, b) => Number.parseInt(a.timestamp) - Number.parseInt(b.timestamp)
    );
    const processedData: { [key: string]: ChartData } = {};
    const itemTotals: { [key: string]: number } = {};

    sortedData.forEach((item) => {
      const date = new Date(Number.parseInt(item.timestamp) / 1000)
        .toISOString()
        .split("T")[0];
      if (!processedData[date]) {
        processedData[date] = { date };
      }

      const itemName =
        itemNameMap[item.itemId] || `Unknown Item ${item.itemId}`;
      if (!itemTotals[itemName]) {
        itemTotals[itemName] = 0;
      }

      itemTotals[itemName] += Number.parseInt(item.amount);
      processedData[date][itemName] = itemTotals[itemName];
    });

    return Object.values(processedData);
  };

  const chartData = processData(data);

  // Generate a color for each unique item
  const itemNames = Array.from(
    new Set(
      data.map(
        (item) => itemNameMap[item.itemId] || `Unknown Item ${item.itemId}`
      )
    )
  );
  const colorScale = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
  ];
  const itemColors = Object.fromEntries(
    itemNames.map((name, index) => [
      name,
      colorScale[index % colorScale.length],
    ])
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stock Decrease History</CardTitle>
        <CardDescription>
          Cumulative stock decrease over time for each item
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={Object.fromEntries(
            Object.entries(itemColors).map(([key, color]) => [
              key,
              { label: key, color },
            ])
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {itemNames.map((name) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={`var(--color-${name.replace(/\s+/g, "-")})`}
                  activeDot={{ r: 8 }}
                />
              ))}
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StockDecreaseHistory;
