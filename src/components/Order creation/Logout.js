// import logout from '../../images/logout.png'
// import {UserContext} from '../../App'
// import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logout from '../../images/turn-off-icon.png'
function Logout(){
    // const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const userLogout = () =>{
        localStorage.removeItem("jwt")
        // localStorage.removeItem("summary")
        // dispatch({type:"CLEAR"})
        navigate("/")
    }
    return<div className="dropdown"><img src={logout} alt="logout.png" onClick={()=>userLogout()} /></div>
}
export default Logout