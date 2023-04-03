import OrderFooter from "../Order/OrderFooter"
import OrderNav from "../Order/OrderNav"
import OrderSideBar from "../Order/OrderSidebar"
import CreateOrderMainBody from "./CreateOrderMainBody"


function CreateOrder(){
    return <>
        <OrderNav />
        <CreateOrderMainBody/>
        <OrderSideBar />
        <OrderFooter />
    </>
}
export default CreateOrder