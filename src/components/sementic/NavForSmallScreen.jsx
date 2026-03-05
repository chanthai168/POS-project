import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

const angleBracket = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><g fill="currentColor"><path fillRule="evenodd" d="m11.453 11l4.2-5.04c1.28-1.536-1.025-3.457-2.305-1.92L8.39 9.988c-.256.272-.42.63-.418 1.012c-.002.382.162.74.418 1.012l4.957 5.948c1.28 1.537 3.585-.384 2.304-1.92z" clipRule="evenodd" opacity={0.2}></path><path d="m12.384 15.68l-5-6l-.768.64l5 6z"></path><path d="m11.616 16.32l-5-6c-.427-.512.341-1.152.768-.64l5 6c.427.512-.341 1.152-.768.64"></path><path d="m11.616 3.68l-5 6l.768.64l5-6z"></path><path d="m12.384 4.32l-5 6c-.427.512-1.195-.128-.768-.64l5-6c.427-.512 1.195.128.768.64"></path></g></svg>;


function NavForSmallScreen(){
    const [isHambugerClick,setIsHambugerClick] = useState(false);
    const [heightDropdown,setHeightDropdown] = useState({height:"0"});
    const [rotateDegree,setRotateDegree] = useState("0");
    const location = useLocation();

    function handleClick(){
        setIsHambugerClick(prev => !prev);
    }

    useEffect(()=>{
        if(isHambugerClick){
            setHeightDropdown({height:"380px"});
            setRotateDegree("90");
        }
        else{
            setHeightDropdown({height:"0px"});
            setRotateDegree("0");
        }

    },[isHambugerClick])

    useEffect(()=>{
        if(isHambugerClick){
            handleClick();
        }
    },[location]);

    return(
        <>
        <div className="hambuger-menu">
            <button onClick={handleClick} >
                <span className="hambuger-bar" style={{rotate:`${rotateDegree}deg`}}> {angleBracket}</span> 
                
            </button>

            <div className={isHambugerClick ? "options activate-animation":"options"} style={heightDropdown} >
                <NavLink to="/"         onClick={handleClick}>Dashboard</NavLink>
                <NavLink to="/order"    onClick={handleClick}>Order</NavLink>
                <NavLink to="/table"    onClick={handleClick}>Table</NavLink>
                <NavLink to="/pos"      onClick={handleClick}>POS</NavLink>
                <NavLink to="/setting"         onClick={handleClick}>Setting</NavLink>
                <NavLink to="/notification"    onClick={handleClick}>Notification</NavLink>
                <NavLink to="#"         onClick={handleClick}>Languages</NavLink>
            </div>
        </div>
        </>
    )
}
export default NavForSmallScreen;