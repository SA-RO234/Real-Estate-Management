import React from 'react'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  LabelList,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  { agency: "Bright Group", sales: 9.3 },
  { agency: "NewStar Realty", sales: 9.15 },
  { agency: "Sunrise Homes", sales: 8.85 },
  { agency: "NextGen Agents", sales: 8.7 },
  { agency: "Skyline Realty", sales: 8.4 },
  { agency: "MegaProperty Co.", sales: 7.95 },
];
const TopAgencybySale = () => {
  return (
    <div className="w-[70%] backdrop-blur-sm bg-black/60 rounded-[20px]">
      <h1 className="text-[20px] font-moul text-white p-[30px] ">
        ភ្នាក់ងារលក់បានច្រើនជាងគេ ទាំង ៥​ នាក់
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
        >
         
          <XAxis
            type="number"
            stroke='#fff'
            domain={[0, 12]}
            tickFormatter={(value) => `$${value}M`}
          />
          <YAxis
            stroke='#fff'
            dataKey="agency"
            type="category"
        
            tick={{ fontWeight: 500 , width: 500}}
          />
          <Tooltip formatter={(value) => `$${value}M`} />
          <Legend />

          <Bar
            dataKey="sales"
            fill="#ED7D3A"
            barSize={24}
            radius={[0, 8, 8, 0]}
          >
            <LabelList
              dataKey="sales"
              position="right"
              formatter={(val: number) => `$${val.toFixed(2)}M`}
              style={{ fill: "#fff",  fontWeight: 500 }}
            />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopAgencybySale