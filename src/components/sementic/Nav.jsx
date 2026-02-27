import logo from "../../assets/pn-logo.png"
import sunflower from "../../assets/sunflower.png"
import pain from "../../assets/pain.png"

import { Router,Route,NavLink,Link } from "react-router-dom"
function Nav(){
    return (
        <nav>
            <div className="logo">
                <img src={sunflower} alt="image-logo: sunflower" height="48px"/>
                <p>SUNFLOWER</p>
            </div>

            <div className="links">
                <div className="mainLinks">
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="order">Order</NavLink>
                    <NavLink to="table">Table</NavLink>
                    <NavLink to="pos">POS</NavLink>
                </div>

                <div className="secondaryLinks">
                    <NavLink to="setting"><i class="fa-solid fa-sliders"></i></NavLink>
                    <NavLink to="setting"><i class="fa-solid fa-earth-americas"></i></NavLink>
                    <NavLink to="setting"><i class="fa-regular fa-bell"></i></NavLink>
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
    )
}
export default Nav;