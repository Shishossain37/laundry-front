// import OrderNav from "./OrderNav"
import home from '../../images/home-run (1).svg'
import list from '../../images/list.svg'
import plus1 from '../../images/plus1.jpg'
import { Link } from 'react-router-dom'
import Logout from '../Order creation/Logout'
// import logout from '../Order creation/turn-off-icon.png'
function OrderSideBar() {
    return <div className='sidebar'>
        <div><Link to="/"><img src={home} alt='home' /></Link></div>
        <div><Link to="/ordercontent"><img className='plus1' src={plus1} alt='create' /></Link></div>
        <div><Link to="/createorder"><img src={list} alt='list' /></Link></div>
        <div><Logout/></div>

    </div>
}
export default OrderSideBar