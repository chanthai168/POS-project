import { useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import SalesLineChart from "./components/chart/Chart";
import Box from "./components/box/box";
import OrderStatusChart from "./components/chart/OrderStatusChart";
import RevenueBox from "./components/box/RevenueBox";
import TableBox from "./components/box/TableBox";
import SalesRankingCard from "./components/dashboard/SalesRankingCard";
import TotalCustomer from "./components/box/TotalCustomer";

const angleIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.121a1 1 0 0 1-.707-.293L7.05 10.586a1 1 0 0 1 1.414-1.414L12 12.707l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.242a1 1 0 0 1-.707.293"></path></svg>;
const totalCustomerIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 384h-128V256H475l768 768l-768 768h1189v-128h128v256H256v-91l805-805l-805-805v-91h1536z"></path></svg>;

const PERIODS = ["Week", "Month", "Year"];

// Order status breakdown derived from real orders
function getOrderStatusData(order) {
  const counts = { Pending: 0, Confirm: 0, Served: 0, Cooking: 0 };
  order.forEach(o => {
    const status = o.status?.charAt(0).toUpperCase() + o.status?.slice(1);
    if (counts[status] !== undefined) counts[status]++;
    else counts["Pending"]++;
  });
  return [
    { name: "Pending",  order: counts.Pending  },
    { name: "Confirm",  order: counts.Confirm  },
    { name: "Served",   order: counts.Served   },
    { name: "Cooking",  order: counts.Cooking  },
  ];
}

// Build chart data from real orders grouped by day/week/month
function buildChartData(order) {
  const days    = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeks   = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const months  = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const weekY  = [0, 0, 0, 0, 0, 0, 0];
  const monthY = [0, 0, 0, 0];
  const yearY  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  order.forEach(o => {
    const date = new Date(o.orderDate?.date);
    if (isNaN(date)) return;

    // Day of week
    const dayIndex = (date.getDay() + 6) % 7; // Mon=0 Sun=6
    weekY[dayIndex] += o.total ?? 0;

    // Week of month (rough)
    const weekIndex = Math.min(Math.floor((date.getDate() - 1) / 7), 3);
    monthY[weekIndex] += o.total ?? 0;

    // Month of year
    yearY[date.getMonth()] += o.total ?? 0;
  });

  return {
    Week:  { xData: days,   yData: weekY  },
    Month: { xData: weeks,  yData: monthY },
    Year:  { xData: months, yData: yearY  },
  };
}

function Dashboard() {
  const [period, setPeriod] = useState("Week");
  const [open, setOpen] = useState(false);
  const { order } = useAppContext();

  const DATA = buildChartData(order);
  const { xData, yData } = DATA[period];

  const ORDER_DATA = getOrderStatusData(order);

  return (
    <div className="mt-6 md:mt-8">
      <h2 className="text-2xl md:text-3xl font-medium mb-2">Operational Snapshot</h2>
      <div className="flex flex-col md:flex-row gap-2 pb-2">

        {/* Revenue — now reads from real order totals */}
        <RevenueBox />

        <div className="flex gap-2">
          {/* Table status */}
          <TableBox />

          {/* Total orders placed — real order count, no hardcoded +10 */}
          <TotalCustomer icon={totalCustomerIcon} number={order.length} />
        </div>

        <h2 className="text-2xl font-medium mt-3 sm:hidden">Analytic</h2>

        {/* Order status chart — derived from real orders */}
        <OrderStatusChart ORDER_DATA={ORDER_DATA} />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 w-full mb-8 h-auto lg:h-[560px]">
        <div className="bg-soft-white mg-0 w-full lg:w-[60%] px-4 md:px-8 py-2 md:py-6 rounded-3xl md:rounded-edge border border-white">
          <div className="flex justify-between mb-6">
            <h2 className="text-gray-950 font-medium text-xl sm:text-2xl md:text-3xl">
              Sale <span className="hidden sm:inline">Analytic</span>
            </h2>

            {/* Period dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen(p => !p)}
                className="flex items-center text-sm bg-gray-200 rounded-4xl px-4 py-1.5 gap-1 active:scale-95 transition-transform"
              >
                {period}
                <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                  {angleIcon}
                </span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 bg-white border border-white rounded-2xl shadow-md overflow-hidden z-10 w-32">
                  {PERIODS.map(p => (
                    <button
                      key={p}
                      onClick={() => { setPeriod(p); setOpen(false); }}
                      className={`w-full text-left px-4 border-b border-gray-200 py-2 text-sm hover:bg-gray-200 transition-colors ${period === p ? "text-blue-500 font-medium" : "text-gray-700"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sales chart — built from real order data */}
          <SalesLineChart xData={xData} yData={yData} />
        </div>

        <div className="h-full w-full lg:w-[40%]">
          <h2 className="text-2xl mt-3 mb-2 font-medium sm:hidden">Items Ranking</h2>
          <SalesRankingCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;