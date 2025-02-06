"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsageGraph } from "@/components/app/dashboard/usage-graph"
import { InventoryTable } from "@/components/app/dashboard/inventory-table"
import { Overview } from "@/components/app/dashboard/overview"
import { Section } from "@/components/common/section"

export default function InventoryPage() {
  
  return (
    <div className="w-full space-y-6">
      <Section id="overview" title="Inventory Dashboard">
        <div className="border-x border-t">
          <Overview />
          <Card>
            <CardHeader>
              <CardTitle>Inventory Page</CardTitle>
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
              <InventoryTable />
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}

