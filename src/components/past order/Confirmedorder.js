import { Link } from "react-router-dom"
import orderconfirm from "../../images/orderconfirm.jpg"
import CreateOrder from "../Order creation/CreateOrder"

function Confirmedorder() {
    // const [showConfirmation, shouldShowConfirmation] = useState(true)
    return <>
        <CreateOrder />
        <div className="message-box">
            <img style={{ height: "150px", width: "150px" }} src={orderconfirm} alt="check.jpg" />
            <p style={{ color: "#0A1F44", fontSize: "24px", fontWeight: "bold" }}>Your order is successfully confirmed.</p>
            <p style={{ color: "#0A1F44", fontSize: "17px" }}>You can track the delivery in the "Orders" section.</p>
            <div className="go-to-order">
                <Link to="/ordercontent"><button>Go to orders</button></Link>

            </div>
        </div>
    </>
}
export default Confirmedorder