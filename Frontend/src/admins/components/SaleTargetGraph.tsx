import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sep 2024", sales: 7.95, target: 8.0 },
  { name: "Oct 2024", sales: 8.4, target: 8.2 },
  { name: "Nov 2024", sales: 8.7, target: 8.5 },
  { name: "Dec 2024", sales: 8.85, target: 8.7 },
  { name: "Jan 2025", sales: 9.15, target: 9.0 },
  { name: "Feb 2025", sales: 9.3, target: 9.1 },
];
export default function MyComposedChart() {
  return (
    <div className="w-full h-full p-[30px] backdrop-blur-sm bg-black/60 rounded-[20px]">
      <h1 className="text-[20px] font-moul text-white">ការលក់ និង គោលដៅ</h1>
      <p className="text-white text-[15px] font-moul pb-[50px]">
        នៃរយះពេល ៦ ខែចុងក្រោយ
      </p>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          width={700}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#fff" />
          <XAxis stroke="#fff" dataKey="name" scale="auto" />
          <YAxis
            domain={[0, 12]}
            tickFormatter={(value) => `$${value}M`}
            stroke="#fff"
          />
          <Tooltip formatter={(value) => `$${value}M`} />
          <Legend
            iconType="square"
            formatter={(value) => (value === "sales" ? "Sales" : "Target")}
          />
          <Bar dataKey="sales" fill="#2F3D7E" barSize={50} >
            <LabelList
              dataKey="sales"
              position="top"
              formatter={(val: number) => `$${val.toFixed(2)}M`}
              style={{ fill: "#fff", fontWeight: 600 }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="target"
            stroke="#ffa500"
            strokeWidth={2}
            dot={{ r: 5, stroke: "#ED7D3A", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
