
const revenueIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="currentColor" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z"></path><path fill="currentColor" d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"></path></svg>;
const upIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 20v-8m0 0l3 3m-3-3l-3 3m-9-1l8-8l3 3l5-5"></path></svg>;

import { useAppContext } from "../../../../context/AppProvider";

function RevenueBox(){

    const {salesRanking} = useAppContext();

    const d = new Date().toDateString();

    let totalRevenue = 0;
    salesRanking.forEach(e=>{
        totalRevenue += e.price * e.quantity;
    })

    return(
        <>
        <div className=" p-4 md:p-6 flex flex-col gap-4 md:gap-10 rounded-3xl md:rounded-edge bg-soft-white w-full md:w-76 border border-white">
            <div className=" flex gap-4 items-center">
                <p className=" bg-soft-gray w-12 h-12 flex items-center text-green-500 justify-center rounded-3xl">{revenueIcon}</p>
                <p className="text-2xl md:text-3xl font-[Lato] ">${totalRevenue.toFixed(2)}</p>
            </div>
            <p className="text-gray-600 flex justify-between">Total-Revenue <span className=" text-xs flex bg-green-100 rounded-3xl px-2 p-1">{d}</span></p>
        </div>
        </>
    )
}
export default RevenueBox;