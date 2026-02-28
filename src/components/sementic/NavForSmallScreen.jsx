import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

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
            setHeightDropdown({height:"400px"});
            setRotateDegree("45");
        }
        else{
            setHeightDropdown({height:"0"});
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
                <span className="hambuger-bar" style={{rotate:`${rotateDegree}deg`}}></span> 
                <span className="hambuger-bar" style={{rotate:`-${rotateDegree}deg`}}></span>
            </button>

            <div className="options" style={heightDropdown} >
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