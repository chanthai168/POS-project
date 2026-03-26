
import { useState,useEffect } from "react";
import { useAppContext } from "../../context/AppProvider";
import SalesLineChart from "./components/chart/Chart";
import Box from "./components/box/box";
import OrderStatusChart from "./components/chart/OrderStatusChart";
import RevenueBox from "./components/box/RevenueBox";
import TableBox from "./components/box/TableBox";
import SalesRankingCard from "./components/dashboard/SalesRankingCard";
import OrderList from "./components/order/OrderList";

const angleIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.121a1 1 0 0 1-.707-.293L7.05 10.586a1 1 0 0 1 1.414-1.414L12 12.707l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.242a1 1 0 0 1-.707.293"></path></svg>;
const readyToServedIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M21 16V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h9"></path><path d="M3 8h8V6m10 2h-8V6m3 14l2 2l4-4"></path></g></svg>;
const confirmIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"></path><path strokeDasharray={14} d="M8 12l3 3l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="14;0"></animate></path></g></svg>;
const preparIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 64 64"><path fill="#3e4347" d="m60.3 4l-.3-.3c-2.3-2.3-6.1-2.3-8.4 0l-10 10.1c-10-6.2-23.3-5-32 3.7C-.5 27.7-.5 44.2 9.6 54.3c10.1 10.2 26.6 10.2 36.7 0c8.6-8.6 9.9-21.9 3.9-31.9l10.1-10.1c2.3-2.3 2.3-6 0-8.3m-4.7 8.1c-2.1 0-3.7-1.7-3.7-3.7c0-2.1 1.7-3.7 3.7-3.7s3.7 1.7 3.7 3.7c0 2.1-1.6 3.7-3.7 3.7"></path><path fill="#fff" d="M12.2 30.1c-4.1 9.1-1.2 19.3 6.6 22.8c7.7 3.5 17.3-1.1 21.4-10.2s1.2-19.3-6.6-22.8c-7.7-3.5-17.3 1-21.4 10.2"></path><circle cx={23} cy={36} r={8} fill="#f29a2e"></circle></svg>;




function Order() {

  const {order,setOrder} = useAppContext();

  let numberOfConfirm = 0;
  let numberOfPreparing = 0;
  let numberOfPending = 0;
  let numberOfServed = 0;

  if(order.length > 0 ){
    order.forEach(e=>{

      switch(e.status.toLowerCase()){
        case "pending":
          numberOfPending ++;
        break;
        case "accepted":
          numberOfConfirm ++;
        break;
        case "preparing":
          numberOfPreparing ++;
        break;
        case "serving":
          numberOfServed ++;
        break;
      }
    })
  }



  return (
    <>
    <div className="mt-6 md:mt-8">
        <h2 className=" text-2xl md:text-3xl font-medium mb-2">Operational Snapshot</h2>
        
        <div className="flex flex-col md:flex-row gap-2 mb-2 ">

            <div className=" flex gap-2  ">
              <div className="w-[33.33%]  md:w-[50%]"><Box icon={confirmIcon} number={numberOfPending} text={"Pending"} /></div>
              <div className=" w-[33.33%] md:w-[50%]"><Box icon={preparIcon} number={numberOfConfirm} text={"Confirm"} /></div>
              <div className=" w-[33.33%] md:w-[50%]"><Box icon={readyToServedIcon} number={numberOfPreparing} text={"Preparing"} /></div>
            </div>

            <h2 className="text-2xl font-medium mt-3 sm:hidden">Analytic</h2>
            <OrderStatusChart />
        </div>
        <div>
          <OrderList orders={order} setOrder={setOrder} />
        </div>
    </div>
    </>
  );
  
}

export default Order;