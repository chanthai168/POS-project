import DonutChart from "./DonatChart";
import { useAppContext } from "../../../../context/AppProvider";

function OrderStatusChart(){

      const {order,setOrder} = useAppContext();
    
        let numberOfConfirm = 0;
        let numberOfPreparing = 0;
        let numberOfPending = 0;
        let numberOfServed = 0;
        let totalOrder = 0;
    
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

          totalOrder ++;
        })
      }
    
      const ORDER_STATE = [
        { name: "Confirm",  order: numberOfConfirm,   color: "oklch(62.3% 0.214 259.815)" },
        { name: "Pending",  order: numberOfPending,   color: "oklch(68.5% 0.169 237.323)" },
        { name: "Served",   order: numberOfServed,    color: "oklch(62.7% 0.194 149.214)" },
        { name: "Cooking",  order: numberOfPreparing, color: "oklch(55.8% 0.288 302.321)" },
      ];

    return(
        <>
        <div className="flex grow items-center justify-start bg-soft-white box-border rounded-3xl md:rounded-edge border border-white">
            
            <div className=" w-[40%] relative">
                <DonutChart ORDER_DATA={ORDER_STATE} />
                <div className=" absolute  left-[50%] top-[50%] translate-[-50%]  z-0 ">
                    <p className=" text-center font-[Lato] text-2xl md:text-3xl font-medium">{totalOrder}</p>
                    <p className=" text-gray-500 text-sm md:text-md">Orders</p>
                </div>
            </div>
            <div className=" flex flex-col gap-4 justify-between h-[60%]">
                <h2 className="text-xl md:text-2xl font-medium">Order Status</h2>
                <div className=" grid grid-cols-2 gap-2 text-sm md:text-md text-gray-500">
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl bg-sky-500" ></span>Pending</p>
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl bg-blue-600"></span>Confirm</p>
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl bg-purple-600" ></span>Preparing</p>
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl bg-green-600"></span>Serving</p>
                </div>
            </div>
        </div>
        
        </>
    )
}
export default OrderStatusChart;