
import { useAppContext } from "../../context/AppProvider";
import Box from "./components/box/box";
import OrderStatusChart from "./components/chart/OrderStatusChart";
import OrderList from "./components/order/OrderList";

const confirmIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"></path><path strokeDasharray={14} d="M8 12l3 3l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="14;0"></animate></path></g></svg>;
const preparIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 64 64"><path fill="#3e4347" d="m60.3 4l-.3-.3c-2.3-2.3-6.1-2.3-8.4 0l-10 10.1c-10-6.2-23.3-5-32 3.7C-.5 27.7-.5 44.2 9.6 54.3c10.1 10.2 26.6 10.2 36.7 0c8.6-8.6 9.9-21.9 3.9-31.9l10.1-10.1c2.3-2.3 2.3-6 0-8.3m-4.7 8.1c-2.1 0-3.7-1.7-3.7-3.7c0-2.1 1.7-3.7 3.7-3.7s3.7 1.7 3.7 3.7c0 2.1-1.6 3.7-3.7 3.7"></path><path fill="#fff" d="M12.2 30.1c-4.1 9.1-1.2 19.3 6.6 22.8c7.7 3.5 17.3-1.1 21.4-10.2s1.2-19.3-6.6-22.8c-7.7-3.5-17.3 1-21.4 10.2"></path><circle cx={23} cy={36} r={8} fill="#f29a2e"></circle></svg>;
const pendingIcon = <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 18.5a6.5 6.5 0 1 1 0-13a6.5 6.5 0 0 1 0 13M4 12a8 8 0 1 1 16 0a8 8 0 0 1-16 0m8 4a4 4 0 0 1-4-4h4V8a4 4 0 0 1 0 8" clipRule="evenodd"></path></svg>;




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
        <h2 className=" text-2xl md:text-3xl font-medium mb-2">Order Management</h2>
        
        <div className="flex flex-col md:flex-row gap-2 mb-2 ">

            <div className=" flex gap-2  ">
              <div className="w-[33.33%] flex  md:w-[50%]"><Box icon={pendingIcon} number={numberOfPending} text={"Pending"} /></div>
              <div className=" w-[33.33%] flex md:w-[50%]"><Box icon={confirmIcon} number={numberOfConfirm} text={"Confirm"} /></div>
              <div className=" w-[33.33%] flex md:w-[50%]"><Box icon={preparIcon} number={numberOfPreparing} text={"Preparing"} /></div>
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