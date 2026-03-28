import { useAppContext } from "../../../../context/AppProvider";
import ListRankingItem from "./ListRankingItem";
import { useState, useMemo } from "react";

const angleIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.121a1 1 0 0 1-.707-.293L7.05 10.586a1 1 0 0 1 1.414-1.414L12 12.707l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.242a1 1 0 0 1-.707.293"></path></svg>;

const FILTERS_MODE = ["Top-selling", "Low-Selling", "Rating"];

function SalesRankingCard() {
    const { salesRanking, setSalesRanking } = useAppContext();
    const [filter, setFilter] = useState("Top-selling");
    const [open, setOpen] = useState(false);

    // Use useMemo to prevent unnecessary recalculations
    const sortedRanking = useMemo(() => {
        // Make sure salesRanking exists and is an array
        if (!salesRanking || !Array.isArray(salesRanking)) {
            return [];
        }
        
        return [...salesRanking].sort((a, b) => {
            if (filter === "Top-selling") return b.quantity - a.quantity;
            if (filter === "Low-Selling") return a.quantity - b.quantity;
            if (filter === "Rating") return b.rating - a.rating;
            return 0;
        });
    }, [salesRanking, filter]); // Recalculate when salesRanking or filter changes

    return (
        <div className="h-full flex flex-col bg-soft-white w-full py-2 md:py-6 p-4 md:p-8 rounded-3xl md:rounded-edge border border-white relative">
            <div className="relative self-end">
                <button
                    onClick={() => setOpen(p => !p)}
                    className="flex items-center text-sm self-end bg-gray-200 rounded-4xl px-4 py-1.5 gap-1 active:scale-95 transition-transform"
                >
                    {filter}
                    <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                        {angleIcon}
                    </span>
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 bg-white border border-white rounded-2xl shadow-md overflow-hidden z-10 w-32">
                        {FILTERS_MODE.map(p => (
                            <button
                                key={p}
                                onClick={() => { 
                                    setFilter(p); 
                                    setOpen(false); 
                                }}
                                className={`w-full text-left px-4 border-b border-gray-200 py-2 text-sm hover:bg-gray-200 transition-colors ${filter === p ? "text-blue-500 font-medium" : "text-gray-700"}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="pl-14 md:pl-28 flex text-sm md:text-md gap-2 md:gap-8 mt-2 border-b border-gray-300">
                <p className="w-24 text-gray-800">Name</p>
                <p className="w-8 text-gray-800">Sold</p>
                <p className="w-12 text-gray-800">Rating</p>
                <p className="text-gray-800">Price</p>
            </div>
            <div className="overflow-scroll">
                {sortedRanking.map(e => {
                    return <ListRankingItem key={e.id} item={e} />;
                })}
            </div>
        </div>
    );
}

export default SalesRankingCard;