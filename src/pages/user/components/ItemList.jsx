
const rightAngleBracket = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 320 512"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256L73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>;
const starIcon = <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25"></path></svg>;
const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"></path></svg>;

function ItemList({ item,cart,setCart }) {
    function increment(){
      setCart(prev=>{
        return prev.map(e=>{
          if(e.id == item.id){
            return {...e,quantity:e.quantity + 1};
          }
          return e;
        })
      })
    }

    function decrement(){
      setCart(prev=>{
        return prev.map(e=>{
          if(e.id == item.id && e.quantity > 1){
            return {...e,quantity:e.quantity - 1};
          }
          return e;
        })
      })
    }

    function deleteItem(){
        const text = "Are you sure, that you want delete that item ?";
        
        if(!window.confirm(text)) return;

        setCart(prev=>{
          return prev.filter(e => e.id !== item.id);
      })
    }

  return (
    <div className="cart-grid w-full items-center px-0 py-2 border-b border-gray-300" >
      <img src={item.image} alt={item.name} className="h-14 w-18 rounded-xl object-cover md:h-20 md:w-32 " />
      
      <p className="font-[Lato] text-sm md:pl-3">${item.price}</p>
      <p className="flex text-red-400 text-sm md:pl-3">{starIcon}{starIcon}{starIcon}{starIcon}</p>
      <p className="hidden md:block text-sm truncate md:pl-3">{item.name}</p>
      
      <div className="flex items-center gap-3 justify-center">
        <p className="text-sm">{item.quantity}</p>
        <div className="flex flex-col">
          <button onClick={increment}
          className="rotate-270 bg-gray-100 text-gray-500 md:p-1 rounded-r-2xl">{rightAngleBracket}</button>
          <button onClick={decrement}
          className="rotate-90 bg-gray-100 text-gray-500 md:p-1 rounded-r-2xl" >{rightAngleBracket}</button>
        </div>
      </div>

      <button onClick={deleteItem}
      className="text-red-400">{deleteIcon}</button>
    </div>
  );
}
export default ItemList;
