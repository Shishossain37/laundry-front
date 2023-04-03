import React from "react";
// import lock from '../images/lock.png'
// import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
    <><nav>
        <div className="nav-wrapper white">
            <h5 to="" className="brand-logo left">Laundry</h5> {/*left to put the logo on left when screen size decreased*/}
            <ul id="nav-mobile" className="right">
                <li>Home</li>
                <li>Pricing</li>
                <li>Career</li>
                <li id="sign-in">Sign in</li>
            </ul>
        </div>
    </nav>
    </>)
}
export default Navbar