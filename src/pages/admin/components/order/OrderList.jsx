import { useState } from "react";

// const ORDER_DATA = [
//   {
//     orderId: 1,
//     image: "/images/sea-food.jpg",
//     tableNumber: 2,
//     guest: 1,
//     subTotal: 96,
//     discount: 20,
//     minAgo: 5,
//     date: new Date().toDateString(),
//     timeInTheDay: "8am",
//     status: "pending", // pending, accepted, preparing, serving
//     items: [
//       { foodName: "Espresso", image: "/images/sea-food.jpg", quantity: 2, basePrice: 25 },
//       { foodName: "Croissant", image: "/images/sea-food.jpg", quantity: 2, basePrice: 18 },
//       { foodName: "Orange Juice", image: "/images/sea-food.jpg", quantity: 1, basePrice: 20 },
//     ],
//   },
//   {
//     orderId: 3,
//     tableNumber: null,
//     guest: 2,
//     subTotal: 192,
//     discount: 0,
//     minAgo: 12,
//     date: new Date().toDateString(),
//     timeInTheDay: "11am",
//     status: "pending",
//     items: [
//       { foodName: "Espresso", image: "/images/sea-food.jpg", quantity: 2, basePrice: 25 },
//       { foodName: "Croissant", image: "/images/sea-food.jpg", quantity: 2, basePrice: 18 },
//       { foodName: "Orange Juice", image: "/images/sea-food.jpg", quantity: 1, basePrice: 20 },
//     ],
//   },
//   {
//     orderId: 4,
//     image: "/images/sea-food.jpg",
//     tableNumber: 12,
//     guest: 4,
//     subTotal: 210,
//     discount: 30,
//     minAgo: 20,
//     date: new Date().toDateString(),
//     timeInTheDay: "1:15pm",
//     status: "pending",
//     items: [
//       { foodName: "Espresso", image: "/images/sea-food.jpg", quantity: 2, basePrice: 25 },
//       { foodName: "Croissant", image: "/images/sea-food.jpg", quantity: 2, basePrice: 18 },
//       { foodName: "Orange Juice", image: "/images/sea-food.jpg", quantity: 1, basePrice: 20 },
//     ],
//   },
// ];

const CIRCLE_COLORS = [
  "bg-red-400",
  "bg-pink-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-indigo-600",
  "bg-green-400",
  "bg-purple-500",
  "bg-orange-400",
];

const FILTER_OPTIONS = ["All Order", "Pending", "Accepted", "Preparing", "Serving"];

function DetailModal({ order, onClose, onUpdateStatus }) {
  const total = order.subTotal - order.discount;
  
  const getNextStatus = () => {
    switch(order.status) {
      case "pending": return "accepted";
      case "accepted": return "preparing";
      case "preparing": return "serving";
      case "serving": return "completed";
      default: return "pending";
    }
  };
  
  const getButtonText = () => {
    switch(order.status) {
      case "pending": return "Accept";
      case "accepted": return "Start Preparing";
      case "preparing": return "Mark as Serving";
      case "serving": return "Complete Order";
      default: return "Completed";
    }
  };
  
  const getStatusColor = () => {
    switch(order.status) {
      case "pending": return "bg-sky-100 text-sky-700";
      case "accepted": return "bg-blue-100 text-blue-700";
      case "preparing": return "bg-purple-100 text-purple-700";
      case "serving": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };
  
  const handleStatusUpdate = () => {
    if (order.status !== "serving") {
      onUpdateStatus(order.orderId, getNextStatus());
    }
  };
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      onUpdateStatus(order.orderId, "deleted");
      onClose();
    }
  };
  
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl lg:rounded-edge shadow-2xl w-[96vw] p-2 md:p-4  max-w-md border border-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 py-4 ">
          <div>
            <h3 className="text-base  text-gray-800">
              Order #{order.orderId}
            </h3>
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-sm ${getStatusColor()}`}>
              {order.status.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="px-6 py-4 max-h-62 rounded-2xl overflow-y-scroll overflow-hidden bg-soft-gray">
          <div className="grid grid-cols-5 text-sm gap-2 text-gray-600 tracking-wide mb-2">
            <span className="text-right"></span>
            <span className="col-span-2">Name</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Price</span>
          </div>
          {order.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center gap-2 text-sm text-gray-700 py-2 border-b border-gray-300 last:border-0"
            >
              <span className=" overflow-hidden">
                <img src={item.image} alt="food-image" className="w-16 h-14 rounded-sm object-cover" />
              </span>
              <span className="col-span-2">{item.name}</span>
              <span className="text-center text-gray-400">×{item.quantity}</span>
              <span className="text-right font-medium">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="px-6 py-4 bg-gray-50 rounded-xl space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>${order.subTotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold text-gray-800 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-end mt-4 text-black">
            <div>
              <div>Date</div>
              <div className=" text-gray-600">{order.orderDate.date}</div>
            </div>
            <span>{order.orderDate.time}</span>
          </div>

          <div className="flex mt-8 gap-2">

            <button
              onClick={handleDelete}
              className="bg-red-50 text-red-500 flex-1 py-1.5 rounded-3xl hover:bg-red-200 transition-colors"
            >
              Delete Order
            </button>
            {order.status !== "serving" && (
              <button
                onClick={handleStatusUpdate}
                className="bg-indigo-500 text-white flex-1 py-1.5 rounded-3xl hover:bg-indigo-600 transition-colors"
              >
                {getButtonText()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function OrderList({orders,setOrder}) {
  const [filter, setFilter] = useState("All Order");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState(null);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrder(prevOrders => 
      prevOrders.map(order => 
        order.orderId === orderId 
          ? { ...order, status: newStatus }
          : order
      ).filter(order => newStatus !== "deleted" || order.orderId !== orderId)
    );


    
    // Update detail modal if it's open for this order
    if (detailOrder && detailOrder.orderId === orderId) {
      if (newStatus === "deleted") {
        setDetailOrder(null);
      } else {
        setDetailOrder(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const getStatusButtonText = (status) => {
    switch(status) {
      case "pending": return "Accept";
      case "accepted": return "Prepare";
      case "preparing": return "Serve";
      case "serving": return "Complete";
      default: return status;
    }
  };
  
  const getStatusButtonClass = (status) => {
    switch(status) {
      case "pending": return "bg-indigo-500 hover:bg-indigo-600 text-white";
      case "accepted": return "bg-blue-500 hover:bg-blue-600 text-white";
      case "preparing": return "bg-purple-500 hover:bg-purple-600 text-white";
      case "serving": return "bg-green-500 hover:bg-green-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  
  const getStatusTextClass = (status) => {
    switch(status) {
      case "pending": return "bg-sky-100 text-sky-600";
      case "accepted": return "bg-blue-100 text-blue-600";
      case "preparing": return "bg-purple-100 text-purple-600";
      case "serving": return "bg-green-100 text-green-600";
      default: return "bg-grey-50 text-gray-600";
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "All Order") return true;
    return order.status === filter.toLowerCase();
  });

  return (
    <div className="rounded-3xl lg:rounded-edge border mb-4 border-white bg-soft-white flex items-center justify-center p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Order List</h2>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-soft-gray rounded-3xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition-colors"
            >
              <span>{filter}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-50 rounded-xl shadow-lg z-10 overflow-hidden">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setFilter(opt); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors border-b border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 ${
                      filter === opt ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Header */}
        <div className=" hidden  lg:grid grid-cols-6 text-xs text-gray-600 tracking-wide px-2 mb-2">
          <span>Table Number</span>
          <span className="text-center">Payment Method</span>
          <span className="text-center">Total Price</span>
          <span className="text-center">Order At</span>
          <span className="text-center">Status</span>
          <span className="text-right">Action</span>
        </div>

        <div className="border-t border-gray-200" />

        {/* Rows */}
        {filteredOrders.map((order, index) => {
          const colorClass = CIRCLE_COLORS[index % CIRCLE_COLORS.length];
          const total = order.subTotal - order.discount;

          return (
            <div key={order.orderId}>
              <div className="grid grid-cols-4 items-start lg:grid-cols-6  lg:items-center gap-2 px-2 py-4 hover:bg-gray-50 rounded-xl transition-colors">
                {/* Table Number */}
                <div className="flex items-center gap-3">
                  {order.tableNumber != null ? (
                    <span
                    className={`w-8 h-8 rounded-full flex items-center font-[Lato] justify-center text-white text-sm font-bold ${colorClass}`}
                  >
                    {order.tableNumber}
                  </span>
                  ):(
                    <span>
                        None
                    </span>
                  )}
                </div>

                {/* Guest */}
                <span className="text-center text-sm text-gray-700 font-[Lato]">{order.payMethod}</span>

                {/* Total Price */}
                <span className="text-center text-sm text-gray-700 font-[Lato] font-medium">
                  ${total.toFixed(2)}
                </span>

                {/* Order Time */}
                <span className="text-center text-sm text-gray-500">
                  {order.orderDate.time}
                </span>

                {/* Status */}
                <span className={`text-center w-auto text-sm justify-center font-medium flex  `}>
                  <span className={`w-24 rounded-sm hiden ${getStatusTextClass(order.status)}`}>{order.status.toUpperCase()}</span>
                </span>

                {/* Actions */}
                <div className="flex items-center col-span-3 lg:col-span-1   justify-end gap-2 ">
                  {order.status !== "serving" && (
                    <button
                      onClick={() => {
                        const nextStatus = order.status === "pending" ? "accepted" :
                                         order.status === "accepted" ? "preparing" :
                                         order.status === "preparing" ? "serving" : "completed";
                        updateOrderStatus(order.orderId, nextStatus);
                      }}
                      className={`px-4 py-1.5 rounded-3xl text-sm  ${getStatusButtonClass(order.status)}`}
                    >
                      {getStatusButtonText(order.status)}
                    </button>
                  )}
                  
                  {order.status === "serving" && (
                    <button
                      onClick={() => updateOrderStatus(order.orderId, "deleted")}
                      className="px-4 py-1.5 rounded-3xl text-sm transition-all bg-red-500 hover:bg-red-600 text-white"
                    >
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() => setDetailOrder(order)}
                    className="px-4 py-1.5 text-sm rounded-3xl text-gray-700 bg-soft-gray hover:bg-gray-300 transition-colors"
                  >
                    Detail
                  </button>
                </div>

              </div>
              <div className="border-t border-gray-200" />
            </div>
          );
        })}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailOrder && (
        <DetailModal 
          order={detailOrder} 
          onClose={() => setDetailOrder(null)} 
          onUpdateStatus={updateOrderStatus}
        />
      )}

    </div>
  );
}

export default OrderList;