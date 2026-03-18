import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const SalesLineChart = ({ xData, yData }) => {
  const data = xData.map((label, i) => ({ label, sales: yData[i] }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#115ff0" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#115ff0" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />

        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
          width={45}
        />

        <Tooltip
        
          formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          cursor={{ stroke: "#115ff0", strokeWidth: 1, strokeDasharray: "4 4" }}
        />

        <Area
          type="monotone"
          dataKey="sales"
          stroke="#115ff0"
          strokeWidth={2.5}
          fill="url(#salesGradient)"
          dot={{ r: 3, fill: "#115ff0", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "#115ff0", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesLineChart;