// import { useState } from "react"
// import CreateOrderMainBody from "../Order creation/CreateOrderMainBody"

import { Link} from "react-router-dom"

function SummaryFooter({sendData}) {
    // const [showOrderMessage,shouldShowOrderMessage] = useState(false)

    return <section className="section2">
        <h6>Address</h6>
        <div className="footer-addres"><b><div>Home</div></b>HN 52 Raj vihar colony , jagjeetpur, kankhal, Haridwar</div>
        <div className="summary-footer">
            <Link to={"/confirmedorder"}><button style={{cursor:"pointer"}} onClick={() => {
                sendData()
                // shouldShowOrderMessage(true)
                // {<CreateOrderMainBody shouldShowOrderMessage={shouldShowOrderMessage(true)}/>}
            }}>Confirm</button></Link>
        </div>


    </section>
}
export default SummaryFooter