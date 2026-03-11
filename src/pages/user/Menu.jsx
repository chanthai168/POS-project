import Card from "./components/Card";
import SearchAndFilter from "./components/SearchAndFilter";
import foods from "./../../../public/foods.json";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PopUpCard from "./components/PopUpCard";
import PaymentLoadingModal from "./components/PaymentLoadingModel";
function Menu() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");

    const handleClick = (e) =>{
        setClicked(prev => !prev);
    }

    const filteredDatas = useMemo(() => {
        return foods.filter((item) => {
            // 1. Check if it matches the search query
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
            
            // 2. Check if it matches the category (or if "All" is selected)
            const matchesCategory = category === "All" || item.category.toLowerCase() === category.toLowerCase();
            
            // 3. Only keep the item if it matches BOTH
            return matchesQuery && matchesCategory;
        });
    }, [query, category]);

    return (
        <>
        <div className="pt-[2vw] px-[2vw] my-8 bg-transparent md:bg-soft-white rounded-edge  duration-300 ease">
            <div className="flex flex-col md:flex-row gap-2 justify-between">
                
                <h3 className="text-3xl font-medium text-gray-600 w-fit" style={{fontFamily:"Great Vibes"}}><Link to={"/admin/setting"}>Romdol</Link></h3>
                
                <SearchAndFilter 
                    query={query} 
                    setQuery={setQuery} 
                    category={category} 
                    setCategory={setCategory} 
                />
            </div>

            {filteredDatas.length <= 0 ? (
                <h1 >Doesn't found</h1>
            ) : (
                <div className="flex flex-wrap gap-8 justify-center py-12">
                    {filteredDatas.map(data => {

                        return <Card    onClick={handleClick}
                                        key={data.id} 
                                        data={data}
                                        /> 

                        })}
                </div>
            )}

            
        </div>
        </>
    )
}

export default Menu;