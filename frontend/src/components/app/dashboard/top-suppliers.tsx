"use client";

import React, { useEffect, useState } from "react";
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

const TOP_SUPPLIERS_QUERY = gql`
  {
    suppliers(where: { avgDeliveryTime_lte: "3", totalOrders_gte: "2" }) {
      id
      name
      totalOrders
      totalAmountSpent
      avgDeliveryTime
    }
  }
`;

interface Supplier {
  id: string;
  name: string;
  totalOrders: string;
  totalAmountSpent: string;
  avgDeliveryTime: string;
}

export function TopSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data: any = await request(
          "https://api.studio.thegraph.com/query/92897/inventory-manager-2/version/latest",
          TOP_SUPPLIERS_QUERY
        );
        setSuppliers(data.suppliers);
      } catch (err) {
        setError("Failed to fetch top suppliers data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading top suppliers...</p>
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
        <CardTitle>Top Suppliers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Amount Spent</TableHead>
              <TableHead>Avg. Delivery Time (days)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.totalOrders}</TableCell>
                <TableCell>
                  ${(parseInt(supplier.totalAmountSpent) / 100).toFixed(2)}
                </TableCell>
                <TableCell>{supplier.avgDeliveryTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
