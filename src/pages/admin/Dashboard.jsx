import { useState,useEffect } from "react";
import { useAppContext } from "../../context/AppProvider";
import SalesLineChart from "./components/chart/Chart";
import Box from "./components/box/box";
import OrderStatusChart from "./components/chart/OrderStatusChart";
import RevenueBox from "./components/box/RevenueBox";
import TableBox from "./components/box/TableBox";
import SalesRankingCard from "./components/dashboard/SalesRankingCard";

const angleIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.121a1 1 0 0 1-.707-.293L7.05 10.586a1 1 0 0 1 1.414-1.414L12 12.707l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.242a1 1 0 0 1-.707.293"></path></svg>;

let DATA = {
  Week: {
    xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yData: [1000, 850, 1200, 950, 3000],
  },
  Month: {
    xData: ["Week 1", "Week 2", "Week 3", "Week 4"],
    yData: [7200, 9400, 8100, 11300],
  },
  Year: {
    xData: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    yData: [32000, 27500, 41000, 38500, 52000, 47800, 61000, 58200, 44000, 39500, 53000, 71000],
  },
};

const ORDER_DATA = [
        { name: 'Confirm', order: 10 },
        { name: 'Pending', order: 20 },
        { name: 'Served', order: 30 },
        { name: 'Cooking', order: 50 }
      ];

const PERIODS = ["Week", "Month", "Year"];


function Dashboard() {
    const [period, setPeriod] = useState("Week");
    const [open, setOpen] = useState(false);
    const { xData, yData } = DATA[period];
    const {salesRanking} = useAppContext();

    function totalRevenueCalculation(){
      let totalRevenue = 0;
      salesRanking.forEach(e=>{
          totalRevenue += e.price * e.quantity;
      })
      return totalRevenue;
    }

    function updateDATA(day,week,month){
      const totalRevenue = totalRevenueCalculation();
      const Week = DATA.Week;
      let dayIndex = Week.xData.indexOf(day);
      Week.yData[dayIndex] = totalRevenue;

      
      const Month = DATA.Month;
      let weekIndex = Month.xData.indexOf(week);
      Month.yData[weekIndex] += totalRevenue;

      const Year = DATA.Year;
      let monthIndex = Year.xData.indexOf(month);
      Year.yData[monthIndex] += totalRevenue;

      DATA = {...DATA,Week:Week,Month:Month,Year:Year};
    }

    updateDATA("Sat","Week 4","Dec");

  return (
    <>
    <div className="mt-6 md:mt-8">
        <h2 className=" text-2xl md:text-3xl font-medium mb-2">Operational Snapshot</h2>
        <div className="flex flex-col md:flex-row gap-2 pb-2">
            
            <RevenueBox/>
            <div className=" flex gap-2">
              <TableBox/>
              <Box/>
            </div>

            <h2 className="text-2xl font-medium mt-3 sm:hidden">Analytic</h2>
            <OrderStatusChart ORDER_DATA={ORDER_DATA} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-2 w-full mb-8 h-auto lg:h-[560px]">
          <div className="bg-soft-white mg-0 w-full lg:w-[60%] px-4 md:px-8 py-2 md:py-6 rounded-3xl md:rounded-edge border border-white">
              <div className="flex justify-between mb-6">
              <h2 className="text-gray-950 font-medium text-xl sm:text-2xl md:text-3xl">Sale <span className="hidden sm:inline">Analytic</span></h2>

              {/* Dropdown */}
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
                  <div className="absolute right-0 mt-2 bg-white borderborder-white rounded-2xl shadow-md overflow-hidden z-10 w-32">
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
              <SalesLineChart xData={xData} yData={yData} />
          </div>

          <div className=" h-full w-full lg:w-[40%]">
              <h2 className=" text-2xl mt-3 mb-2 font-medium sm:hidden">Items Ranking</h2>
              <SalesRankingCard/>
          </div>
        </div>  

    </div>
    </>
  );
  
}

export default Dashboard;