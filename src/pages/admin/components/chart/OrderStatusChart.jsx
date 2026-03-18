import DonutChart from "./DonatChart";
function OrderStatusChart({ORDER_DATA}){
    let totalOrder = 0;
    ORDER_DATA.forEach(e=>{
        totalOrder += e.order;
    })

    return(
        <>
        <div className="flex grow items-center justify-start bg-soft-white box-border rounded-3xl md:rounded-edge border border-white">
            
            <div className=" w-[40%] relative">
                <DonutChart ORDER_DATA={ORDER_DATA} />
                <div className=" absolute  left-[50%] top-[50%] translate-[-50%]  z-0 ">
                    <p className=" font-[Lato] text-2xl md:text-3xl font-medium">{totalOrder}</p>
                    <p className=" text-gray-500 text-sm md:text-md">Orders</p>
                </div>
            </div>
            <div className=" flex flex-col gap-4 justify-between h-[60%]">
                <h2 className="text-xl md:text-2xl font-medium">Order Status</h2>
                <div className=" grid grid-cols-2 gap-2 text-sm md:text-md text-gray-500">
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl" style={{backgroundColor:"#0547ed"}}></span>Pending</p>
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl" style={{backgroundColor:"#ed05da"}}></span>Confirm</p>
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl" style={{backgroundColor:"#ff4788"}}></span>Cooking</p>
                    <p className=" flex items-center gap-1"><span className="block h-4 w-4 rounded-2xl" style={{backgroundColor:"#15D1D1"}}></span>Served</p>
                </div>
            </div>
        </div>
        
        </>
    )
}
export default OrderStatusChart;