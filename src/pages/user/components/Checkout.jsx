import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../../context/AppProvider";

const rightAngleBracket = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 320 512"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256L73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>;


const PAY_METHODS = ["QR", "Cash", "Card"];


function Checkout({total,payMethod,setPayMethod,tableNumber,setTableNumber,handleCheckout}) {

  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const {tables} = useAppContext();

  const TABLE_NUMBERS = tables.filter(table => !table.status).map(e=>e.number);

  return (
    <div className="flex flex-col w-full lg:w-[40vw] bg-soft-white rounded-3xl md:rounded-edge  p-4 md:p-8 border border-white ">

      {/* Table Number */}
      <div className="flex justify-between border-b border-gray-300 py-2 relative">
        <p className="text-lg">Table Number</p>
        <div className="relative">
          <button
            onClick={() => setShowTableDropdown(p => !p)}
            className="bg-gray-300 text-black flex items-center gap-1 justify-between px-6 rounded-3xl py-1"
          >
            {tableNumber ? `Table ${tableNumber}` : "None"}
            <span className={`transition-transform duration-200 ${showTableDropdown ? "-rotate-90" : "rotate-90"}`}>
              {rightAngleBracket}
            </span>
          </button>

          {showTableDropdown && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 p-2 grid grid-cols-3 gap-1 w-44">
              <button
                onClick={() => { setTableNumber(null); setShowTableDropdown(false); }}
                className={`col-span-3 text-sm rounded-xl py-1 px-2 text-center ${tableNumber === null ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
              >
                None
              </button>
              {TABLE_NUMBERS.map(n => (
                <button
                  key={n}
                  onClick={() => { setTableNumber(n); setShowTableDropdown(false); }}
                  className={`text-sm rounded-xl py-1.5 text-center transition-colors ${tableNumber === n ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pay By */}
      <div className="flex justify-between border-b border-gray-300 py-2">
        <p className="text-lg">Pay By</p>
        <div className="flex gap-2 bg-gray-200 px-2 p-1 rounded-3xl">
          {PAY_METHODS.map(method => (
            <button
              key={method}
              onClick={() => setPayMethod(method)}
              className={` px-3 md:px-6 rounded-3xl py-1 transition-colors duration-150 ${payMethod === method ? "bg-blue-500 text-white" : "text-black"}`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between border-b border-gray-300 py-2">
        <p>Total to pay</p>
        <p className="text-lg font-bold font-[Lato]">${total.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-12">
        <NavLink to="/user/menu" className="w-[50%] bg-gray-300 rounded-3xl py-1.5 flex justify-center active:scale-95">
            <button >Order More</button>
        </NavLink>
        <button onClick={handleCheckout}
        className="w-[50%] bg-blue-500 text-white rounded-3xl py-1 active:scale-95">Checkout</button>
      </div>
    </div>
  );
}

export default Checkout;