import { useEffect, useState } from "react"
// import { useEffect} from "react"
import SummaryFooter from "./SummaryFooter"
import SummaryHeader from "./SummaryHeader"

function Summary({ sendData, productSummaryInfo }) {
    const [info, setInfo] = useState("")
    useEffect(() => {
        setInfo(productSummaryInfo)
        console.log(productSummaryInfo)
    }, [productSummaryInfo])

    const total = () => {
        if (info.length) {
            let totalPrice = 0
            for (let i = 0; i < info.length; i++) {
                let inp = info[i]
                for (let x in inp) {
                    if (x === "price") {
                        totalPrice += inp[x]
                    }
                }
            }
            return totalPrice 
        }
    }

    // const serviceArray = () =>{
    //     if(info.length){
    //         let arr = ""
    //         for(let i=0;i<info.length;i++){
    //             let inp = info[i]
    //             for(let x in inp){
    //                 if(x ==="serviceArray"){
    //                     for(let j=0;j<inp[x].length;j++){
    //                         arr+=inp[x]+" "
    //                     }
    //                 }
    //             }
    //         }
    //         return arr
    //     }
    // }

    return <><div className="summary-page">
        <SummaryHeader />
        <section className="summary-section1">

            <div className="summary-address">
                <div style={{ fontWeight: "bold" }}>
                    Store Address:
                </div>

                <div style={{ fontWeight: "bold" }}>Store Phone</div>
                <div style={{ fontSize: "13px" }}>HN 52 kankhal, Haridwar</div>
                <div style={{ fontSize: "13px" }}>8874979010</div>

            </div>
            {/* {info.length && info.map(item=>{
                return <><div>{item.product}</div><div>{item.serviceArray}</div></>
            })} */}
            <div className="summary-orders">
                <h6>Orders</h6>
                {info.length && info.map(item => {
                    return <tbody className="table1">
                        <tr className="list">
                            <td className="list-product">{item.product}</td>
                            <td className="list-serviceArray">{`${info.length? item.serviceArray:""}`}</td>
                            <td className="list-price"><span className="list-product">{item.quantity}X{item.sum} =</span>{item.price}</td>
                        </tr>
                    </tbody>
                })}
                {/* <table className="table2">
                    <tr>
                        <td>Pickup charges</td>
                        <td>60</td>
                    </tr>
                </table> */}

            </div>
            <table>
                <tbody className="table3">
                    <tr >
                        <td style={{ color: "white", fontSize: "18px",textAlign:"end" }}>Total price</td>
                        <td style={{ color: "white", fontSize: "22px",textAlign:"center" }}><span>₹ </span>{total()}</td>
                    </tr>
                </tbody>
            </table>
            {/* <div className="summary-orders">
                <h6>Orders</h6>
                <table>
                    <tbody className="table1">
                        <tr className="list">
                            <td>Shirt</td>
                            <td>washing,Iron</td>
                            <td>125</td>
                        </tr>
                        <tr className="list">
                            <td>Tshirt</td>
                            <td>washing,Iron</td>
                            <td>60</td>
                        </tr>
                        <tr className="list">
                            <td>jeans</td>
                            <td>washing,Iron</td>
                            <td>75</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table2">
                    <tr className="list">
                        <td>sub total</td>
                        <td>280</td>
                    </tr>
                    <tr className="list">
                        <td>Pickup charges</td>
                        <td>60</td>
                    </tr>
                </table>
                <table className="table3">
                    <tr >
                        <td style={{ color: "#FFFFFF", fontSize: "18px" }}>Total price</td>
                        <td style={{ color: "#FFFFFF", fontSize: "22px" }}><span>Rs </span>340</td>
                    </tr>
                </table>
            </div> */}
        </section>

        <SummaryFooter sendData={sendData} />
        <div>

        </div>
    </div>
    </>
}
export default Summary