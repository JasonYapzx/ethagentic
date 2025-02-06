"use client";

import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LATEST_RESTOCKS_QUERY = gql`
  {
    restockInitiateds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
      itemId
      restockAmount
      supplier
      totalCost
    }
  }
`;

interface Item {
  itemId: string;
  name: string;
}

interface RestockData {
  itemId: string;
  restockAmount: string;
  supplier: string;
  totalCost: string;
}

export function LatestRestocks({ items }: { items: Item[] }) {
  const [restocks, setRestocks] = useState<RestockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestocks = async () => {
      try {
        const data: any = await request(
          "https://api.studio.thegraph.com/query/92897/inventory-manager-2/version/latest",
          LATEST_RESTOCKS_QUERY
        );
        setRestocks(data.restockInitiateds);
      } catch (err) {
        setError("Failed to fetch restock data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestocks();
  }, []);

  const getItemName = (itemId: string) => {
    const item = items.find((item) => item.itemId === itemId);
    return item ? item.name : "Unknown Item";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading latest restocks...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-red-500">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Restocks</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Restock Amount</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restocks.map((restock, index) => (
              <TableRow key={index}>
                <TableCell>{getItemName(restock.itemId)}</TableCell>
                <TableCell>{restock.restockAmount}</TableCell>
                <TableCell>{restock.supplier}</TableCell>
                <TableCell>
                  ${(Number.parseInt(restock.totalCost) / 100).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
