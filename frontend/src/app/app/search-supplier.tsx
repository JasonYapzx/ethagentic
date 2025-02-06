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
import { Loader2 } from "lucide-react";

const SUPPLIER_SEARCH_QUERY = gql`
  query SupplierSearch($text: String!) {
    SupplierSearch(text: $text) {
      id
      name
      totalAmountSpent
      totalOrders
      avgDeliveryTime
    }
  }
`;

export function SupplierSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: any = await request(
        "https://api.studio.thegraph.com/query/92897/inventory-manager-2/version/latest",
        SUPPLIER_SEARCH_QUERY,
        {
          text: searchText,
        }
      );
      console.log(data);
      setSearchResults(data.SupplierSearch);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search suppliers..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}

      {searchResults && searchResults.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total Amount Spent</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Avg. Delivery Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResults.map((supplier: any) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>
                  ${(supplier.totalAmountSpent / 100).toFixed(2)}
                </TableCell>
                <TableCell>{supplier.totalOrders}</TableCell>
                <TableCell>{supplier.avgDeliveryTime} days</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500">
          {searchResults
            ? "No results found"
            : "Enter a search term and click Search"}
        </div>
      )}
    </div>
  );
}
