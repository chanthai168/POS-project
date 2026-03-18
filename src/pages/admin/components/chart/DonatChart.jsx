import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#ed05da', '#0547ed', '#15D1D1', '#ff4788'];

const DonutChart = ({ORDER_DATA}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate loading data + trigger animation
    setTimeout(() => {
      setData(ORDER_DATA);
    }, 100);
  }, []);

  return (
    <div style={{  height: '160px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="order"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="66%"
            outerRadius="90%"
            paddingAngle={2}
            labelLine={false}
            isAnimationActive={true}
            animationDuration={400}
            animationEasing="ease"
            cornerRadius={4}
            focusable={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(order,name) => [`${name} ${order.toLocaleString()}`]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              fontSize: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            cursor={{ stroke: "#115ff0", strokeWidth: 1, strokeDasharray: "4 4" }}
            wrapperStyle={{zIndex:"100"}}
          />
          
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;