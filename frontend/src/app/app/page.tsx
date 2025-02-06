import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageGraph } from "@/components/app/dashboard/usage-graph";
import { InventoryTable } from "@/components/app/dashboard/inventory-table";
import { Overview } from "@/components/app/dashboard/overview";
import { Section } from "@/components/common/section";
import { getBuiltGraphSDK } from "../../../.graphclient";

export default async function AppPage() {
  const {
    GetItems,
    GetStockDecreasedAggregationDay,
    GetStockDecreasedAggregationHour,
  } = getBuiltGraphSDK();
  const { items } = await GetItems();

  const itemCount = items
    .map((item) => item.quantity)
    .reduce((acc, current) => acc + parseInt(current), 0);

  const inventoryValue = items
    .map((item) => item.price * item.quantity)
    .reduce((acc, current) => acc + current, 0);

  const microsecondsSinceEpoch24HoursAgo =
    BigInt(Date.now() - 24 * 60 * 60 * 1000) * BigInt(1000);

  const past24hrStockDecrease = await GetStockDecreasedAggregationDay({
    timestamp_gte: microsecondsSinceEpoch24HoursAgo.toString(),
  });

  console.log(past24hrStockDecrease);

  return (
    <div className="w-full space-y-6">
      <Section id="overview" title="Inventory Dashboard">
        <div className="border-x border-t">
          <Overview itemCount={itemCount} inventoryValue={inventoryValue} />
          <Card>
            <CardHeader>
              <CardTitle>Usage Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageGraph />
            </CardContent>
          </Card>

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
