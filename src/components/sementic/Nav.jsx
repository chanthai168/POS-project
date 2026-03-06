import logo from "../../assets/pn-logo.png"
import sunflower from "../../assets/sunflower.png"
import romdolFlower from "../../assets/romdolFlower.png"
import pain from "../../assets/pain.png"
import SlideringLinks from "./SlideringLinks"
import { Router,Route,NavLink,Link } from "react-router-dom"
import NavForSmallScreen from "./NavForSmallScreen"

const languageIcon = <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><path fill="currentColor" d="m12.87 15.07l-2.54-2.51l.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7l1.62-4.33L19.12 17z"></path></svg>
const settingIcon = <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 32 32"><path fill="currentColor" d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11 11 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.5 11.5 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11 11 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.5 11.5 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.9 8.9 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.4 9.4 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.9 8.9 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.4 9.4 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z"></path><path fill="currentColor" d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6m0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4"></path></svg>;
const bellIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6zm-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10z"></path></svg>

function Nav(){

    return (
        <>
        
        <nav>

            <div className="logo  ">
                <img src={romdolFlower} className="rotate-45" alt="image-logo: Romdol flower" height="48px"/>
                <p>Romdol</p>
            </div>

            <div className="links">

                <div className="mainLinks">
                    {/* <div className="slider" ></div>

                    <NavLink to="/"     onClick={moveSlider}>Dashboard</NavLink>
                    <NavLink to="order" onClick={moveSlider}>Order</NavLink>
                    <NavLink to="table" onClick={moveSlider}>Table</NavLink>
                    <NavLink to="pos"   onClick={moveSlider}>POS</NavLink> */}
                    <SlideringLinks/>
                </div>

                <div className="secondaryLinks ">
                    <NavLink to="setting">{settingIcon}</NavLink>
                    <NavLink to="Notification">{bellIcon}</NavLink>
                </div>

                <div className="profile-picture">
                    <div className="name-title">
                        <p>Admin</p>
                        <p>Do roro</p>
                    </div>
                    <img src={pain} alt="profile-picture" height="48px" width="48px" style={{borderRadius:"50px"}} />
                </div>
            
            </div>
 
        </nav>
        
        <NavForSmallScreen/>
        
        </>
        
    )
}
export default Nav;