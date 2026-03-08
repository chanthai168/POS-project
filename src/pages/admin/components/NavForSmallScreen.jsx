import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

const angleBracket = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 0 1 0-8.5M9 9V6.75A2.25 2.25 0 1 0 6.75 9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13m0 2A2.25 2.25 0 1 0 9 17.25V15zm10.5-12.5a4.25 4.25 0 0 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25m0 6.5A2.25 2.25 0 1 0 15 6.75V9zM13 13h4.25A4.25 4.25 0 1 1 13 17.25zm2 2v2.25A2.25 2.25 0 1 0 17.25 15z"></path></svg>
const rightAngleBracket = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={22} viewBox="0 0 320 512"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256L73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>;


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
            setHeightDropdown({height:"340px"});
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
                
                    <NavLink to="/"         onClick={handleClick}>
                        <div className="group flex w-10/12 justify-between cursor-pointer">
                            <p>Dashboard</p>
                            <p className="transition-all duration-300 ease-in-out -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                {rightAngleBracket}
                            </p>
                        </div>
                    </NavLink>

                    <NavLink to="/order"    onClick={handleClick}>
                        <div className="group flex w-10/12 justify-between cursor-pointer">
                            <p>Order</p>
                            <p className="transition-all duration-300 ease-in-out -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                {rightAngleBracket}
                            </p>
                        </div>
                    </NavLink>

                    <NavLink to="/table"    onClick={handleClick}>
                        <div className="group flex w-10/12 justify-between cursor-pointer">
                            <p>Table</p>
                            <p className="transition-all duration-300 ease-in-out -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                {rightAngleBracket}
                            </p>
                        </div>
                    </NavLink>

                    <NavLink to="/pos"      onClick={handleClick}>
                        <div className="group flex w-10/12 justify-between cursor-pointer">
                        <p>POS</p>
                        
                        <p className="transition-all duration-300 ease-in-out -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                            {rightAngleBracket}
                        </p>
                        </div>
                    </NavLink>

                    <NavLink to="/setting"         onClick={handleClick}>
                        <div className="group flex w-10/12 justify-between cursor-pointer">
                        <p>Setting</p>
                        
                        <p className="transition-all duration-300 ease-in-out -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                            {rightAngleBracket}
                        </p>
                        </div>
                    </NavLink>

                    <NavLink to="/notification"    onClick={handleClick}>
                        <div className="group flex w-10/12 justify-between cursor-pointer">
                        <p>Notification</p>
                        
                        <p className="transition-all duration-300 ease-in-out -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                            {rightAngleBracket}
                        </p>
                        </div>
                    </NavLink>
            
            </div>
            
        </div>
        </>
    )
}
export default NavForSmallScreen;