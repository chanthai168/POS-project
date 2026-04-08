import { useAppContext } from "../../../../context/AppProvider";

const revenueIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="currentColor" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z"></path><path fill="currentColor" d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"></path></svg>;

function RevenueBox() {
  const { order } = useAppContext();

  const d = new Date().toDateString();

  // Sum all order totals from real placed orders
  const totalRevenue = order.reduce((sum, o) => sum + (o.total ?? 0), 0);

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-10 rounded-3xl md:rounded-edge bg-soft-white w-full md:w-76 border border-white">
      <div className="flex gap-4 items-center">
        <p className="bg-soft-gray w-12 h-12 flex items-center text-green-500 justify-center rounded-3xl">{revenueIcon}</p>
        <p className="text-2xl md:text-3xl font-[Lato]">${totalRevenue.toFixed(2)}</p>
      </div>
      <p className="text-gray-600 flex justify-between">
        Total-Revenue
        <span className="text-xs flex bg-green-100 rounded-3xl px-2 p-1">{d}</span>
      </p>
    </div>
  );
}

export default RevenueBox;