import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
        </CardContent>
      </Card>
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Restock Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">May 15, 2023</div>
        </CardContent>
      </Card>
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cost of Restock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,678</div>
        </CardContent>
      </Card>
    </div>
  )
}

