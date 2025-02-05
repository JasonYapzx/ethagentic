"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  { date: "Jan", usage: 400 },
  { date: "Feb", usage: 300 },
  { date: "Mar", usage: 500 },
  { date: "Apr", usage: 350 },
  { date: "May", usage: 450 },
  { date: "Jun", usage: 400 },
]

export function UsageGraph() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="usage" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

