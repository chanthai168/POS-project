import Card from "./components/Card";
import SearchAndFilter from "./components/SearchAndFilter";
import foods from "./../../../public/foods.json";

import { useState, useMemo, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAppContext } from "../../context/AppProvider";


const cartIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M19 20c0 1.11-.89 2-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2s-.89-2-2-2m.2-3.37l-.03.12c0 .14.11.25.25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2h3.27l.94 2H20c.55 0 1 .45 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1zM8.5 11H10V9H7.56zM11 9v2h3V9zm3-1V6h-3v2zm3.11 1H15v2h1zm1.67-3H15v2h2.67zM6.14 6l.94 2H10V6z"></path></svg>;

function Menu() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const {cart, setCart} = useAppContext();
    const [cartAnimating, setCartAnimating] = useState(false);
    const prevCartLength = useRef(0);

    const cartCount = cart.length;

    // Trigger animation whenever cart count increases
    useEffect(() => {
        if (cartCount > prevCartLength.current) {
            setCartAnimating(true);
            const timer = setTimeout(() => setCartAnimating(false), 600);
            prevCartLength.current = cartCount;
            return () => clearTimeout(timer);
        }
        prevCartLength.current = cartCount;
    }, [cartCount]);

    const filteredDatas = useMemo(() => {
        return foods.filter((item) => {
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = category === "All" || item.category.toLowerCase() === category.toLowerCase();
            return matchesQuery && matchesCategory;
        });
    }, [query, category]);

    return (
        <>
            <style>{`
                @keyframes cartBounce {
                    0%   { transform: scale(1) rotate(0deg); }
                    25%  { transform: scale(1.35) rotate(-12deg); }
                    50%  { transform: scale(1.2) rotate(8deg); }
                    75%  { transform: scale(1.3) rotate(-5deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                @keyframes badgePop {
                    0%   { transform: scale(0.5); opacity: 0.5; }
                    60%  { transform: scale(1.4); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes ripple {
                    0%   { transform: scale(0.8); opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                .cart-bounce {
                    animation: cartBounce 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97);
                }
                .badge-pop {
                    animation: badgePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .ripple-ring {
                    animation: ripple 0.6s ease-out forwards;
                }
            `}</style>

            <div className="pt-0 md:pt-[2vw] px-[2vw] my-4 md:my-8 bg-transparent md:bg-soft-white rounded-edge duration-300 ease">
                <div className="flex  flex-col sticky top-0 z-10 md:flex-row gap-2 py-2 md:py-3 justify-between bg-transparent backdrop-blur-sm ">

                    <h3 className="text-3xl font-medium text-gray-600 w-fit" style={{ fontFamily: "Great Vibes" }}>
                        <Link to={"/admin/setting"}>Romdol</Link>
                    </h3>

                    <div className=" flex gap-6">
                        {/* Cart Icon with animation */}
                        <h3 className="text-blue-500 relative flex items-center justify-center w-10 h-10 cursor-pointer">
                            {/* Ripple ring on add */}
                            {cartAnimating && (
                                <span
                                    className="ripple-ring absolute inset-0 rounded-full border-2 border-blue-400"
                                    style={{ pointerEvents: "none" }}
                                />
                            )}

                            {/* Cart icon with bounce */}
                            <span
                                className={`inline-flex items-center justify-center transition-colors ${cartAnimating ? "cart-bounce text-blue-600" : "text-blue-500"}`}
                                style={{ display: "inline-flex" }}
                            >
                                <NavLink to="/user/cart">
                                    {cartIcon}
                                </NavLink>
                            </span>

                            {/* Badge */}
                            {cartCount > 0 && (
                                <span
                                    key={cartCount} // re-mount to retrigger animation on each change
                                    className="badge-pop absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md"
                                    style={{ lineHeight: 1 }}
                                >
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </h3>

                        <SearchAndFilter
                            query={query}
                            setQuery={setQuery}
                            category={category}
                            setCategory={setCategory}
                        />
                    </div>
                </div>
                
                {filteredDatas.length <= 0 ? (
                    <h1>Doesn't found</h1>
                ) : (
                    <div className="flex flex-wrap gap-4 md:gap-8 justify-center py-2 md:py-4">
                        {filteredDatas.map(data => (
                            <Card
                                key={data.id}
                                data={data}
                                setCart={setCart}
                                cart={cart}
                            />
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}

export default Menu;