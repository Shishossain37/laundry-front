// import { useState } from 'react'
// import profile from '../../images/profile.jpg'
import profile from '../../images/user.png'

// import Logout from '../Order creation/Logout'
function OrderNav() {
    // const [showCreateButton,shouldShowCreateButton] = useState(true)
    // const [userName,setuserName]=useState("")

    const getName=()=>{
        const userDetails =JSON.parse(localStorage.getItem("user"))
        // const data =JSON.parse(userDetails)
        // console.log(data.name)
        return userDetails.name
    }
    return <>
    {/* <Logout/> */}
    <nav>
        <div className="nav-wrapper white">
            <h5 to="" className="brand-logo left">Laundry</h5> {/*left to put the logo on left when screen size decreased*/}
            <ul id="nav-mobile" className="right">
                <li>Pricing</li>
                <li>Career</li>
                <li id="sign-in" style={{ width: "150px" }}> 
                    <img src={profile} alt="profile" /><span className='username'>{getName()}</span></li>
            </ul>
        </div>
    </nav>
    </>
}
export default OrderNav