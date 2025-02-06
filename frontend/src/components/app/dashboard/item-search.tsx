"use client";

import { useState } from "react";
import { gql, request } from "graphql-request";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const ITEM_SEARCH_QUERY = gql`
  query ItemSearch($name: String!, $avgDeliveryTime: String!) {
    items(
      where: {
        supplier_: { avgDeliveryTime_lte: $avgDeliveryTime }
        name_contains_nocase: $name
      }
    ) {
      id
      itemId
      name
      quantity
      supplier {
        name
        avgDeliveryTime
      }
    }
  }
`;

interface Item {
  id: string;
  itemId: string;
  name: string;
  quantity: string;
  supplier: {
    name: string;
    avgDeliveryTime: string;
  };
}

export function ItemSearch() {
  const [productName, setProductName] = useState("");
  const [avgDeliveryTime, setAvgDeliveryTime] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: any = await request(
        "https://api.studio.thegraph.com/query/92897/inventory-manager-2/version/latest",
        ITEM_SEARCH_QUERY,
        {
          name: productName,
          avgDeliveryTime: avgDeliveryTime || "999", // Use a high number if no delivery time is specified
        }
      );
      setItems(data.items);
    } catch (err) {
      setError("Failed to fetch items");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max delivery time (days)"
              value={avgDeliveryTime}
              onChange={(e) => setAvgDeliveryTime(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>

          {error && <div className="text-red-500">{error}</div>}

          {items.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Avg. Delivery Time (days)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.supplier.name}</TableCell>
                    <TableCell>{item.supplier.avgDeliveryTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              {isLoading ? "Searching..." : "No items found. Try a search!"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
