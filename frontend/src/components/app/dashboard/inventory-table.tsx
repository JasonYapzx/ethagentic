import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const inventoryData = [
  { id: 1, name: "Widget A", quantity: 100, usageRate: "5/day" },
  { id: 2, name: "Gadget B", quantity: 75, usageRate: "3/day" },
  { id: 3, name: "Tool C", quantity: 50, usageRate: "2/day" },
  { id: 4, name: "Device D", quantity: 200, usageRate: "10/day" },
  { id: 5, name: "Product E", quantity: 150, usageRate: "7/day" },
];

export function InventoryTable({ items }: { items: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item ID</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Threshold</TableHead>
          <TableHead>Price per qty</TableHead>
          <TableHead>Total Value</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: any) => (
          <TableRow key={item.itemId}>
            <TableCell>{item.itemId}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.supplier.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.threshold}</TableCell>
            <TableCell>${(item.price / 100).toFixed(2)} </TableCell>
            <TableCell>
              ${((item.price / 100) * item.quantity).toFixed(2)}
            </TableCell>
            <TableCell>
              <Button size="sm">Buy Now</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
