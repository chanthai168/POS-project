const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"></path></g></svg>;
const angleIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.121a1 1 0 0 1-.707-.293L7.05 10.586a1 1 0 0 1 1.414-1.414L12 12.707l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.242a1 1 0 0 1-.707.293"></path></svg>;

import { useState } from "react";
function SearchAndFilter({query,setQuery,category,setCategory}){
    const [isOpen, setIsOpen] = useState(false);

    const categories = ["Food", "Drink", "All"];

    return(
        <>
        <div className="flex gap-2 w-full md:w-auto relative items-center">
            {/* Search Input */}
            <label className="bg-white inline-flex gap-2 w-full items-center h-10 p-1 pl-3 md:bg-soft-gray rounded-3xl  text-gray-600">
                <span >{searchIcon}</span>
                <input 
                    value={query}
                    onChange={(e)=>{setQuery(e.target.value)}}
                    className="placeholder-gray-500 w-[80%] md:w-80 focus:border-0 outline-0 bg-transparent"
                    placeholder="Search product..."
                />
            </label>

            {/* Filter Dropdown */}
            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-white md:bg-soft-gray h-10 rounded-3xl flex items-center px-4 text-gray-600 gap-2 transition-colors active:bg-gray-200"
                >
                    <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        {angleIcon}
                    </span>
                    <span>{category}</span>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <ul className="absolute p-4 right-0 mt-2 w-46 bg-white border border-gray-100 rounded-3xl shadow-lg z-50 overflow-hidden">
                        {categories.map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => {
                                        setCategory(item);
                                        setIsOpen(false);
                                    }}
                                    className="w-full mt-2 text-left px-4 py-2 text-sm text-gray-700 hover:bg-soft-gray transition-colors rounded-3xl"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        </>
    )
}
export default SearchAndFilter;