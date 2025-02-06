import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageGraph } from "@/components/app/dashboard/usage-graph";
import { InventoryTable } from "@/components/app/dashboard/inventory-table";
import { Overview } from "@/components/app/dashboard/overview";
import { Section } from "@/components/common/section";
import { getBuiltGraphSDK } from "../../../.graphclient";
import StockDecreaseHistory from "./stock-decrease-history";

export const revalidate = 0; // Equivalent to no-store

export default async function AppPage() {
  const {
    GetItems,
    GetStockDecreasedAggregationDay,
    GetStockDecreasedAggregationHour,
    GetStockDecreasedData,
  } = getBuiltGraphSDK();
  const { items } = await GetItems();
  console.log(items);

  const itemCount = items
    .map((item) => item.quantity)
    .reduce((acc, current) => acc + parseInt(current), 0);

  const inventoryValue = items
    .map((item) => item.price * item.quantity)
    .reduce((acc, current) => acc + current, 0);

  const microsecondsSinceEpoch24HoursAgo =
    BigInt(Date.now() - 48 * 60 * 60 * 1000) * BigInt(1000);

  const microsecondsSinceEpoch1HourAgo =
    BigInt(Date.now() - 2 * 60 * 60 * 1000) * BigInt(1000);

  const past24hrStockDecrease = await GetStockDecreasedAggregationDay({
    timestamp_gte: microsecondsSinceEpoch24HoursAgo.toString(),
  });

  const stockDecreasedData = await GetStockDecreasedData();
  console.log(stockDecreasedData);

  const past24hrStockDecreaseValue =
    past24hrStockDecrease.stockDecreasedAggregations.reduce(
      (acc, current) => acc + parseInt(current.totalAmount),
      0
    );

  return (
    <div className="w-full space-y-6">
      <Section id="overview" title="Inventory Dashboard">
        <div className="border-x border-t">
          <Overview
            itemCount={itemCount}
            inventoryValue={inventoryValue}
            past24hrStockDecreaseValue={past24hrStockDecreaseValue}
          />
          <StockDecreaseHistory
            data={stockDecreasedData.stockDecreasedDatas}
            items={items}
          />

          <Card>
            <CardHeader>
              <CardTitle>Inventory Table</CardTitle>
            </CardHeader>
            <CardContent>
              <InventoryTable items={items} />
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
