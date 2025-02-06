import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Overview({
  itemCount,
  inventoryValue,
  past24hrStockDecreaseValue,
}: {
  itemCount: number;
  inventoryValue: number;
  past24hrStockDecreaseValue: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Inventory Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{itemCount}</div>
        </CardContent>
      </Card>
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Inventory Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(inventoryValue / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Stock decrements in last 24 Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{past24hrStockDecreaseValue}</div>
        </CardContent>
      </Card>
    </div>
  );
}
