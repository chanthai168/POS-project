import React, { useState, useEffect,useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const DonutChart = ({ ORDER_DATA }) => {
  const [data, setData] = useState([]); 
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setTimeout(() => setData(ORDER_DATA), 0); // animate only on mount
      isFirstRender.current = false;
    } else {
      setData(ORDER_DATA); // update instantly, no animation flash
    }
  }, [ORDER_DATA]);

  const isEmpty = data.length === 0 || data.every(entry => entry.order === 0);

  const displayData = isEmpty
    ? [{ name: "No Orders", order: 1, color: "#e5e7eb" }]
    : data;

  return (
    <div style={{ height: '160px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="order"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="66%"
            outerRadius="90%"
            paddingAngle={isEmpty ? 0 : 2}
            labelLine={false}
            isAnimationActive={!isEmpty}
            animationDuration={400}
            animationEasing="ease"
            cornerRadius={isEmpty ? 0 : 4}
            focusable={false}
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {!isEmpty && (
            <Tooltip
              formatter={(order, name) => [`${name} ${order.toLocaleString()}`]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              cursor={{ stroke: "#115ff0", strokeWidth: 1, strokeDasharray: "4 4" }}
              wrapperStyle={{ zIndex: "100" }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;