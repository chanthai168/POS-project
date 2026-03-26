
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import CalculatePay from "./components/CalculatePay";
import no_data_found from "../../assets/no_data_found.png"

import { useEffect, useState } from "react";
import ItemList from "./components/ItemList";
import Checkout from "./components/Checkout";

import PaymentLoadingModal from "./components/PaymentLoadingModel";

function Cart() {
  const { cart, setCart } = useAppContext();
  const {salesRanking,setSalesRanking} = useAppContext();
  const {order,setOrder} = useAppContext();
  
  const [lenCart,setLenCart] = useState(cart.length);
  const [payMethod, setPayMethod] = useState("QR");
  const [tableNumber, setTableNumber] = useState(null);
  const [isCheckout,setIsCheckout] = useState(false);
 

  let subTotal = 0;
  let foodId = [];
  cart.forEach(e=>{
    subTotal += e.price * e.quantity;
    foodId.push(e.id);
  })
  let discount = 2;
  if(lenCart == 0) discount = 0;
  let total = subTotal - discount;




  function handleCheckout(){

    if(lenCart == 0){
      window.alert("Please, Order something before checkout...");
      return;
    }


    setIsCheckout(true);

    // construct order object then push it into order(array of object for update state) via setorder
    const orderItem = {
      orderId:order.length,
      subTotal,
      discount,
      total,
      payMethod,
      guest:"Unknown",
      tableNumber,
      status: "pending",
      orderDate: {
        time: new Date().toLocaleTimeString(),
        date:new Date().toDateString(),
      },
      items:cart,
    }

    setOrder(prev=> [...prev,orderItem]);

    setCart([]);

    updateSalesRanking();
  }

  console.log(order);

    function updateSalesRanking() {
      setSalesRanking((prev) => {
        // 1. Create a deep copy or map to a new array
        return prev.map((item) => {
          // 2. Find if this item exists in the cart
          const cartItem = cart.find((e) => e.id === item.id);

          if (cartItem) {
            // 3. Return a NEW object (do not mutate the old one)
            return {
              ...item,
              quantity: item.quantity + cartItem.quantity,
            };
          }
          
          // 4. If not in cart, return item as is
          return item;
        });
      });
    }

  useEffect(()=>{
    setLenCart(cart.length);
  },[cart])

    //   {
  //   orderId: 1,
  //   tableNumber: 2,
  //   guest: 1,
  //   subTotal: 96,
  //   discount: 20,
  //   minAgo: 5,
  //   date: new Date().toDateString(),
  //   timeInTheDay: "8am",
  //   status: "pending", // pending, accepted, preparing, serving
  //   items: [
  //     { foodName: "Espresso", image: "/images/sea-food.jpg", quantity: 2, basePrice: 25 },
  //     { foodName: "Croissant", image: "/images/sea-food.jpg", quantity: 2, basePrice: 18 },
  //     { foodName: "Orange Juice", image: "/images/sea-food.jpg", quantity: 1, basePrice: 20 },
  //   ],
  // },



  return (
    <>
    <div className=" flex flex-col lg:flex-row items-start gap-2 my-[2vw]">

      <div className="inline-flex flex-col p-4 gap-2 w-full lg:w-[60vw] items-center bg-soft-white md:py-12 md:px-8 lg:px-12 rounded-3xl border border-white md:rounded-edge min-h-46 md:min-h-124  ">
        
      {lenCart > 0 ?(
          <>
          {/* Header — uses same grid as ItemList */}
          <div className="cart-grid w-full bg-gray-200 px-3 py-2 rounded-xl text-sm text-gray-500 font-medium" >
            <span /> {/* image spacer */}
            <span>Price</span>
            <span>Rating</span>
            <span className="hidden md:block">Name</span>
            <span className="text-center">Quantity</span>
            <span /> {/* delete spacer */}
          </div>

          { cart.map(item =>( item ? <ItemList key={item.id} item={item} cart={cart} setCart={setCart} /> :null))}
          </>
        ):(
          <img src={no_data_found} alt="" className=" h-64 md:h-96" />
        )
      }

      </div>

      
      <div className=" flex flex-col gap-2 w-full lg:w-auto">
        <CalculatePay 
        subTotal={subTotal} 
        discount={discount} 
        total={total}/>

        <Checkout 
        payMethod={payMethod}
        setPayMethod={setPayMethod}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        handleCheckout={handleCheckout}

        total={total}/>
      </div>

    </div>

    {isCheckout && (
      <PaymentLoadingModal isPurchase={isCheckout} setIsPurchase={setIsCheckout} />
    )}

    </>
  );
}
export default Cart;