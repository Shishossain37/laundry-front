import { Link } from "react-router-dom"

function LinkWithCreateOrder() {
    return <div className="LinkWithCreateOrder">
        <h6>orders |</h6>
        <div>
            <div className="create-button">
                <p>No orders avaialble</p>
                <div >
                    <Link to="/createorder" ><button className="button">Create</button></Link>
                </div>
            </div>
        </div>
    </div>
}
export default LinkWithCreateOrder