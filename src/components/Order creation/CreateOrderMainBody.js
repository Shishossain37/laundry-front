import bleach from "./service type images/bleach.svg";
import ironing from "./service type images/ironing.svg";
import towel from "./service type images/towel.svg";
import washingMachine from "./service type images/washing-machine.svg";
import shirt from "./product images/shirt.jpg";
import tshirt from "./product images/tshirt.jpg";
import jeans from "./product images/jeans.jpg";
import others from "./product images/others.jpg";
import joggers from "./product images/joggers.jpg";
import trouser from "./product images/trouser.jpg";
import boxer from "./product images/boxer.jpg";
import { useRef, useState } from "react";
import M from "materialize-css";
import Summary from "../past order/Summary";
function CreateOrderMainBody() {
  const [summary, showSummary] = useState(false);

  const [shirtPrice, setShirtPrice] = useState({
    washing: "",
    toweling: "",
    iron: "",
    bleaching: "",
    quantity: "",
    type: "shirt",
  });
  const [showShirtPrice, shouldShowShirtPrice] = useState(false);

  const [tshirtPrice, setTshirtPrice] = useState({
    washing: "",
    toweling: "",
    iron: "",
    bleaching: "",
    quantity: "",
    type: "tshirt",
  });
  const [showtshirtPrice, shouldShowtshirtPrice] = useState(false);

  const [trouserPrice, setTrouserPrice] = useState({
    washing: "",
    toweling: "",
    iron: "",
    bleaching: "",
    quantity: "",
    type: "trouser",
  });
  const [showTrouserPrice, shouldShowTrouserPrice] = useState(false);

  const [jeansPrice, setJeansPrice] = useState({
    washing: "",
    toweling: "",
    iron: "",
    bleaching: "",
    quantity: "",
    type: "jeans",
  });
  const [showJeansPrice, shouldShowJeansPrice] = useState(false);

  const [boxersPrice, setBoxersPrice] = useState({
    washing: "",
    toweling: "",
    iron: "",
    bleaching: "",
    quantity: "",
    type: "boxer",
  });
  const [showBoxersPrice, shouldShowBoxersPrice] = useState(false);

  const [joggersPrice, setJoggersPrice] = useState({
    washing: "",
    toweling: "",
    iron: "",
    bleaching: "",
    quantity: "",
    type: "jogger",
  });
  const [showJoggersPrice, shouldShowJoggersPrice] = useState(false);

  const [othersPrice, setOthersPrice] = useState({
    washing: "",
    toweling: "",
    iron: "",
    bleaching: "",
    quantity: "",
    type: "others",
  });
  const [showOthersPrice, shouldShowOthersPrice] = useState(false);

  const [productSummaryInfo, setproductSummaryInfo] = useState([]);

  const shirtquantityRef = useRef(null);
  const tshirtquantityRef = useRef(null);
  const trouserquantityRef = useRef(null);
  const jeansquantityRef = useRef(null);
  const joggersquantityRef = useRef(null);
  const boxersquantityRef = useRef(null);
  const othersquantityRef = useRef(null);
  const sendData = () => {
    let productInfo = [
      shirtPrice,
      tshirtPrice,
      trouserPrice,
      jeansPrice,
      boxersPrice,
      joggersPrice,
      othersPrice,
    ];
    // console.log(productInfo[0].washing);
    let flag = false;
    for (let i = 0; i < productInfo.length; i++) {
      let info = productInfo[i];
      if (info.quantity) {
        console.log(info);
        flag = true;
        let serviceArr = [];
        for (let x in info) {
          if (info[x] && x !== "quantity" && x !== "type") {
            serviceArr.push(x);
          }
        }
        // console.log(serviceArr)
        fetch("https://laundry-fyit.onrender.com/createorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            product: info.type,
            quantity: info.quantity,
            service: serviceArr,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.error) {
              return M.toast({
                html: result.error,
                classes: "#d50000 red accent-4",
              });
            } else {
              console.log(result);
            }
          });
      }
    }
    if (flag === false) {
      return M.toast({
        html: "select the quantity and wash type first to proceed",
        classes: "#d50000 red accent-4",
      });
    }
    // console.log(flag)
  };
  const totalPrice = (data) => {
    let total = 0;
    for (let x in data) {
      if (data[x] === "" || x === "quantity" || x === "type") continue;
      total += parseInt(data[x]);
    }
    return parseInt(data.quantity) * total;
  };
  const sendOrderSummary = () => {
    let productInfo = [
      shirtPrice,
      tshirtPrice,
      trouserPrice,
      jeansPrice,
      boxersPrice,
      joggersPrice,
      othersPrice,
    ];
    for (let i = 0; i < productInfo.length; i++) {
      let info = productInfo[i];
      if (info.quantity !== "") {
        fetch("https://laundry-fyit.onrender.com/getprice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            product: info.type,
            wash: info.washing,
            iron: info.iron,
            towel: info.toweling,
            bleach: info.bleaching,
            quantity: info.quantity,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            setproductSummaryInfo((prev) => {
              return [...prev, result];
            });
          });
        // .then(res=>res.json())
        // .then(result=>{
        //     setproductSummaryInfo((prev)=>{
        //         return[
        //             ...prev,result
        //         ]
        //     })
        // })

        /*
                setproductSummaryInfo((prev)=>{
                    return[
                        ...prev,productInfo[i]
                    ]
                })
                */
      }
    }
    // console.log(productSummaryInfo)
  };

  return (
    <div className="createorder-body">
      <h6>Create Order</h6>
      <div className="order-header">
        <h6>Produt Types</h6>
        <h6>Quantity</h6>
        <h6>Wash Type</h6>
        <h6>Price</h6>
      </div>

      {/* for shirt */}
      <div className="align-products">
        <div className="product">
          <img src={shirt} alt="shirt" />
          <span className="product-type">Shirts&nbsp;</span>
          <span className="product-description">
            Lorem Ipsum is simply dummy text of the
          </span>
        </div>
        <div>
          <input
            className="product-quantity"
            min={0}
            type="number"
            ref={shirtquantityRef}
            onChange={(e) => {
              setShirtPrice((prevData) => {
                return { ...prevData, quantity: e.target.value };
              });
              shouldShowShirtPrice(true);
            }}
          />
        </div>
        <div className="service-type">
          <div>
            <img
              src={washingMachine}
              alt="washing-machine"
              onClick={() => {
                setShirtPrice((prevData) => {
                  return { ...prevData, washing: 10 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={ironing}
              alt="ironing"
              onClick={() => {
                setShirtPrice((prevData) => {
                  return { ...prevData, iron: 10 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={towel}
              alt="towel"
              onClick={() => {
                setShirtPrice((prevData) => {
                  return { ...prevData, toweling: 15 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={bleach}
              alt="bleach"
              onClick={() => {
                setShirtPrice((prevData) => {
                  return { ...prevData, bleaching: 25 };
                });
              }}
            />
          </div>
        </div>
        <div className="product-price">
          {`${showShirtPrice ? "₹" : ""}`}
          <input
            style={{
              width: "40px",
              fontSize: "18px",
              borderBottom: "none",
              color: "#5861AE",
              fontWeight: "bold",
            }}
            type="text"
            value={`${!showShirtPrice ? "----" : totalPrice(shirtPrice)}`}
          />
        </div>

        {showShirtPrice && (
          <button
            onClick={() => {
              setShirtPrice({
                washing: "",
                toweling: "",
                iron: "",
                bleaching: "",
                quantity: "",
                type: "shirt",
              });
              shirtquantityRef.current.value = "";
              shouldShowShirtPrice(false);
            }}
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "white",
              border: "1px solid #5861AE",
              color: "#5861AE",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            reset
          </button>
        )}
      </div>

      {/* for Tshirt */}
      <div className="align-products">
        <div className="product">
          <img src={tshirt} alt="tshirt" />
          <span className="product-type">Tshirts</span>
          <span className="product-description">
            Lorem Ipsum is simply dummy text of the
          </span>
        </div>
        <div>
          <input
            className="product-quantity"
            ref={tshirtquantityRef}
            min={0}
            type="number"
            onChange={(e) => {
              setTshirtPrice((prevData) => {
                return { ...prevData, quantity: e.target.value };
              });
              shouldShowtshirtPrice(true);
            }}
          />
        </div>
        <div className="service-type">
          <div>
            <img
              src={washingMachine}
              alt="washing-machine"
              onClick={() => {
                setTshirtPrice((prevData) => {
                  return { ...prevData, washing: 15 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={ironing}
              alt="ironing"
              onClick={() => {
                setTshirtPrice((prevData) => {
                  return { ...prevData, iron: 10 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={towel}
              alt="towel"
              onClick={() => {
                setTshirtPrice((prevData) => {
                  return { ...prevData, toweling: 20 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={bleach}
              alt="bleach"
              onClick={() => {
                setTshirtPrice((prevData) => {
                  return { ...prevData, bleaching: 25 };
                });
              }}
            />
          </div>
        </div>
        <div className="product-price">
          {`${showtshirtPrice ? "₹" : ""}`}
          <input
            onChange={(e) => console.lo(e.target.value)}
            style={{
              width: "40px",
              fontSize: "18px",
              borderBottom: "none",
              color: "#5861AE",
              fontWeight: "bold",
            }}
            type="text"
            value={`${!showtshirtPrice ? "-----" : totalPrice(tshirtPrice)}`}
          />
        </div>

        {showtshirtPrice && (
          <button
            onClick={() => {
              setTshirtPrice({
                washing: "",
                toweling: "",
                iron: "",
                bleaching: "",
                quantity: "",
                type: "tshirt",
              });
              tshirtquantityRef.current.value = "";
              shouldShowtshirtPrice(false);
            }}
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "white",
              border: "1px solid #5861AE",
              color: "#5861AE",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            reset
          </button>
        )}
        {/* 
            <button onClick={(e)=>{
                setTshirtPrice(prevData=>{
                    return{ washing: "", toweling: "", iron: "", bleaching: "", quantity: "",type:"tshirt" }
                })
            }} className='reset-button'>reset</button></div>
        
            */}
      </div>

      {/* for trouser */}
      <div className="align-products">
        <div className="product">
          <img src={trouser} alt="trouser" />
          <span className="product-type">Trouser</span>
          <span className="product-description">
            Lorem Ipsum is simply dummy text of the
          </span>
        </div>
        <div>
          <input
            ref={trouserquantityRef}
            className="product-quantity"
            min={0}
            type="number"
            onChange={(e) => {
              setTrouserPrice((prevData) => {
                return { ...prevData, quantity: e.target.value };
              });
              shouldShowTrouserPrice(true);
            }}
          />
        </div>
        <div className="service-type">
          <div>
            <img
              src={washingMachine}
              alt="washing-machine"
              onClick={() => {
                setTrouserPrice((prevData) => {
                  return { ...prevData, washing: 30 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={ironing}
              alt="ironing"
              onClick={() => {
                setTrouserPrice((prevData) => {
                  return { ...prevData, iron: 15 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={towel}
              alt="towel"
              onClick={() => {
                setTrouserPrice((prevData) => {
                  return { ...prevData, toweling: 10 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={bleach}
              alt="bleach"
              onClick={() => {
                setTrouserPrice((prevData) => {
                  return { ...prevData, bleaching: 20 };
                });
              }}
            />
          </div>
        </div>
        <div className="product-price">
          {`${showTrouserPrice ? "₹" : ""}`}
          <input
            onChange={(e) => console.lo(e.target.value)}
            style={{
              width: "40px",
              fontSize: "18px",
              borderBottom: "none",
              color: "#5861AE",
              fontWeight: "bold",
            }}
            type="text"
            value={`${!showTrouserPrice ? "-----" : totalPrice(trouserPrice)}`}
          />
        </div>

        {showTrouserPrice && (
          <button
            onClick={() => {
              setTrouserPrice({
                washing: "",
                toweling: "",
                iron: "",
                bleaching: "",
                quantity: "",
                type: "trouser",
              });
              trouserquantityRef.current.value = "";
              shouldShowTrouserPrice(false);
            }}
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "white",
              border: "1px solid #5861AE",
              color: "#5861AE",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            reset
          </button>
        )}
      </div>

      {/* for jeans */}
      <div className="align-products">
        <div className="product">
          <img src={jeans} alt="jeans" />
          <span className="product-type">Jeans&nbsp;&nbsp;&nbsp;</span>
          <span className="product-description">
            Lorem Ipsum is simply dummy text of the
          </span>
        </div>
        <div>
          <input
            ref={jeansquantityRef}
            className="product-quantity"
            min={0}
            type="number"
            onChange={(e) => {
              setJeansPrice((prevData) => {
                return { ...prevData, quantity: e.target.value };
              });
              shouldShowJeansPrice(true);
            }}
          />
        </div>
        <div className="service-type">
          <div>
            <img
              src={washingMachine}
              alt="washing-machine"
              onClick={() => {
                setJeansPrice((prevData) => {
                  return { ...prevData, washing: 20 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={ironing}
              alt="ironing"
              onClick={() => {
                setJeansPrice((prevData) => {
                  return { ...prevData, iron: 10 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={towel}
              alt="towel"
              onClick={() => {
                setJeansPrice((prevData) => {
                  return { ...prevData, toweling: 20 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={bleach}
              alt="bleach"
              onClick={() => {
                setJeansPrice((prevData) => {
                  return { ...prevData, bleaching: 30 };
                });
              }}
            />
          </div>
        </div>
        <div className="product-price">
          {`${showJeansPrice ? "₹" : ""}`}
          <input
            onChange={(e) => console.lo(e.target.value)}
            style={{
              width: "40px",
              fontSize: "18px",
              borderBottom: "none",
              color: "#5861AE",
              fontWeight: "bold",
            }}
            type="text"
            value={`${!showJeansPrice ? "-----" : totalPrice(jeansPrice)}`}
          />
        </div>

        {showJeansPrice && (
          <button
            onClick={() => {
              setJeansPrice({
                washing: "",
                toweling: "",
                iron: "",
                bleaching: "",
                quantity: "",
                type: "jeans",
              });
              jeansquantityRef.current.value = "";
              shouldShowJeansPrice(false);
            }}
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "white",
              border: "1px solid #5861AE",
              color: "#5861AE",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            reset
          </button>
        )}
      </div>

      {/* for boxers */}
      <div className="align-products">
        <div className="product">
          <img src={boxer} alt="boxer" />
          <span className="product-type">Boxers&nbsp;</span>
          <span className="product-description">
            Lorem Ipsum is simply dummy text of the
          </span>
        </div>
        <div>
          <input
            ref={boxersquantityRef}
            className="product-quantity"
            min={0}
            type="number"
            onChange={(e) => {
              setBoxersPrice((prevData) => {
                return { ...prevData, quantity: e.target.value };
              });
              shouldShowBoxersPrice(true);
            }}
          />
        </div>
        <div className="service-type">
          <div>
            <img
              src={washingMachine}
              alt="washing-machine"
              onClick={() => {
                setBoxersPrice((prevData) => {
                  return { ...prevData, washing: 15 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={ironing}
              alt="ironing"
              onClick={() => {
                setBoxersPrice((prevData) => {
                  return { ...prevData, iron: 7 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={towel}
              alt="towel"
              onClick={() => {
                setBoxersPrice((prevData) => {
                  return { ...prevData, toweling: 25 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={bleach}
              alt="bleach"
              onClick={() => {
                setBoxersPrice((prevData) => {
                  return { ...prevData, bleaching: 30 };
                });
              }}
            />
          </div>
        </div>
        <div className="product-price">
          {`${showBoxersPrice ? "₹" : ""}`}
          <input
            onChange={(e) => console.lo(e.target.value)}
            style={{
              width: "40px",
              fontSize: "18px",
              borderBottom: "none",
              color: "#5861AE",
              fontWeight: "bold",
            }}
            type="text"
            value={`${!showBoxersPrice ? "-----" : totalPrice(boxersPrice)}`}
          />
        </div>

        {showBoxersPrice && (
          <button
            onClick={() => {
              setBoxersPrice({
                washing: "",
                toweling: "",
                iron: "",
                bleaching: "",
                quantity: "",
                type: "boxer",
              });
              boxersquantityRef.current.value = "";
              shouldShowBoxersPrice(false);
            }}
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "white",
              border: "1px solid #5861AE",
              color: "#5861AE",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            reset
          </button>
        )}
      </div>

      {/* for Joggers */}
      <div className="align-products">
        <div className="product">
          <img src={joggers} alt="joggers" />
          <span className="product-type">Joggers</span>
          <span className="product-description">
            Lorem Ipsum is simply dummy text of the
          </span>
        </div>
        <div>
          <input
            ref={joggersquantityRef}
            className="product-quantity"
            min={0}
            type="number"
            onChange={(e) => {
              setJoggersPrice((prevData) => {
                return { ...prevData, quantity: e.target.value };
              });
              shouldShowJoggersPrice(true);
            }}
          />
        </div>
        <div className="service-type">
          <div>
            <img
              src={washingMachine}
              alt="washing-machine"
              onClick={() => {
                setJoggersPrice((prevData) => {
                  return { ...prevData, washing: 27 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={ironing}
              alt="ironing"
              onClick={() => {
                setJoggersPrice((prevData) => {
                  return { ...prevData, iron: 30 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={towel}
              alt="towel"
              onClick={() => {
                setJoggersPrice((prevData) => {
                  return { ...prevData, toweling: 5 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={bleach}
              alt="bleach"
              onClick={() => {
                setJoggersPrice((prevData) => {
                  return { ...prevData, bleaching: 15 };
                });
              }}
            />
          </div>
        </div>
        <div className="product-price">
          {`${showJoggersPrice ? "₹" : ""}`}
          <input
            onChange={(e) => console.lo(e.target.value)}
            style={{
              width: "40px",
              fontSize: "18px",
              borderBottom: "none",
              color: "#5861AE",
              fontWeight: "bold",
            }}
            type="text"
            value={`${!showJoggersPrice ? "-----" : totalPrice(joggersPrice)}`}
          />
        </div>

        {showJoggersPrice && (
          <button
            onClick={() => {
              setJoggersPrice({
                washing: "",
                toweling: "",
                iron: "",
                bleaching: "",
                quantity: "",
                type: "jogger",
              });
              joggersquantityRef.current.value = "";
              shouldShowJoggersPrice(false);
            }}
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "white",
              border: "1px solid #5861AE",
              color: "#5861AE",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            reset
          </button>
        )}
      </div>

      {/* for others */}

      <div className="align-products">
        <div className="product">
          <img src={others} alt="others" />
          <span className="product-type">others&nbsp;&nbsp;</span>
          <span className="product-description">
            Lorem Ipsum is simply dummy text of the
          </span>
        </div>
        <div>
          <input
            ref={othersquantityRef}
            className="product-quantity"
            min={0}
            type="number"
            onChange={(e) => {
              setOthersPrice((prevData) => {
                return { ...prevData, quantity: e.target.value };
              });
              shouldShowOthersPrice(true);
            }}
          />
        </div>
        <div className="service-type">
          <div>
            <img
              src={washingMachine}
              alt="washing-machine"
              onClick={() => {
                setOthersPrice((prevData) => {
                  return { ...prevData, washing: 30 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={ironing}
              alt="ironing"
              onClick={() => {
                setOthersPrice((prevData) => {
                  return { ...prevData, iron: 20 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={towel}
              alt="towel"
              onClick={() => {
                setOthersPrice((prevData) => {
                  return { ...prevData, toweling: 40 };
                });
              }}
            />
          </div>
          <div>
            <img
              src={bleach}
              alt="bleach"
              onClick={() => {
                setOthersPrice((prevData) => {
                  return { ...prevData, bleaching: 40 };
                });
              }}
            />
          </div>
        </div>
        <div className="product-price">
          {`${showOthersPrice ? "₹" : ""}`}
          <input
            onChange={(e) => console.lo(e.target.value)}
            style={{
              width: "40px",
              fontSize: "18px",
              borderBottom: "none",
              color: "#5861AE",
              fontWeight: "bold",
            }}
            type="text"
            value={`${!showOthersPrice ? "-----" : totalPrice(othersPrice)}`}
          />
        </div>

        {showOthersPrice && (
          <button
            onClick={() => {
              setOthersPrice({
                washing: "",
                toweling: "",
                iron: "",
                bleaching: "",
                quantity: "",
                type: "others",
              });
              othersquantityRef.current.value = "";
              shouldShowOthersPrice(false);
            }}
            style={{
              position: "absolute",
              right: "60px",
              backgroundColor: "white",
              border: "1px solid #5861AE",
              color: "#5861AE",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            reset
          </button>
        )}
      </div>
      <button
        className="button proceed"
        onClick={() => {
          // sendData()
          showSummary(true); //initially summary is false in clicking on this it is becoming true
          sendOrderSummary();
        }}
      >
        proceed
      </button>
      <button
        className="button cancel"
        onClick={() => {
          window.location.reload();
        }}
      >
        cancel
      </button>
      {summary && (
        <Summary productSummaryInfo={productSummaryInfo} sendData={sendData} />
      )}
      {/* {summary && <Summary productSummaryInfo={productSummaryInfo} sendData={sendData} />}  onclick of proceed we are sending this send data function */}
    </div>
  );
}
export default CreateOrderMainBody;
