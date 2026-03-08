

function Card(){

    const data =
    {
        image:"/images/sea-food.jpg",
        name:"Sea Food",
        price:22.99,
        description:"This food is looking good and yummy, I want to eat it, however i don't have money",
        allergen:["crustacean","sesame seed"],
        avilable:true,
        rating:4
    };

    const availableIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M11.707 6.707a1 1 0 0 0-1.414-1.414L7 8.586L5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2"/></svg>;

    return(
        <div className="w-96 bg-white flex flex-col items-center rounded-4xl border border-white ">
            <div className="bg-blue-50 w-full rounded-4xl flex justify-center p-8">
                <img src="/images/sea-food.jpg" alt="food" className=" w-80 rounded-3xl" />
            </div>

            <div className=" flex flex-col gap-2 p-6">
                <div className="flex justify-between">
                    <p className="text-xl">{data.name}</p>
                    <p className=" font-[Lato] font-light text-2xl">${data.price}</p>
                </div>

                <div >
                    <p className=" text-sm text-gray-700">{data.description}</p>
                </div>

                <div>
                    <p className="text-md">Allergen</p>
                    <div className=" flex gap-4">
                        {data.allergen.map((e,index)=>{
                            return <p key={index} className="text-sm text-gray-700">{e}</p>
                        })}
                    </div>
                </div>
                
                <div className=" flex justify-between">
                    {data.avilable ? (
                        <p className="flex items-center gap-2"><span className=" text-green-500">{availableIcon}</span>Available</p>
                    ):(
                        <p>Not available at the moment!</p>
                    )}

                    <p className="font-[Lato] font-light text-xl text-red-500">{data.rating}/5</p>
                </div>
            </div>
        </div>
    )
}
export default Card;