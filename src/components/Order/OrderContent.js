import { useEffect, useState } from "react";
import LinkWithCreateOrder from "./LinkWithCreateOrder";
import OrderFooter from "./OrderFooter";
import OrderNav from "./OrderNav";
import OrderSideBar from "./OrderSidebar";
import eye from "../../images/Eye.svg";
import { useNavigate } from "react-router-dom";
import cross from "../../images/cross.jpg";
import status from "../../images/status.jpg";
import cancel from "../../images/cancel.png";

function OrderContent() {
  const [myorders, showMyOrders] = useState(true);
  const [deleteMessage, showDeleteMessage] = useState(false);
  const [data, setData] = useState([]);
  const [deleteById, setDeleteById] = useState({});

  const [serviceArray, setServiceArray] = useState({});
  const [orderHistory, showOrderhistory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://laundry-fyit.onrender.com/getorder", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.message)
        if (!result.message.length) {
          showMyOrders(false);
        } else {
          // console.log(result)
          setData(result.message);
        }
      })
      .catch((err) => console.log(err));

    // console.log(data)
  }, []);

  const getUserDetails = (inp) => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    if (inp === "district") {
      return userDetails.district;
    }
    if (inp === "address") {
      return userDetails.address;
    }
    if (inp === "phone") {
      return userDetails.phone;
    }
  };

  const deleteItem = (id) => {
    fetch("https://laundry-fyit.onrender.com/deleteorder", {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.user)
        const dataAfterDeletion = data.filter((item) => {
          return item._id !== result.user._id;
        });
        setData(dataAfterDeletion);
        showDeleteMessage(false);
      });
  };
  const findServiceArray = (id) => {
    fetch("https://laundry-fyit.onrender.com/findorder", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        setServiceArray(result);
        // console.log(result)
      });
    // console.log(serviceArray)
  };
  return (
    <>
      <OrderNav />
      {!myorders && <LinkWithCreateOrder />}
      {/* {myorders && } */}
      {myorders && (
        <div className="myorder-header">
          <div className="header-container">
            <div>Order Id</div>
            <div>Order Date & Time</div>
            <div>Store Location</div>
            <div>City</div>
            <div>Store Phone</div>
            <div>Total items</div>
            <div>Price</div>
            <div>Status</div>
            <div>view</div>
            <div>Cancel</div>
          </div>
          <button
            onClick={() => {
              navigate("/createorder");
            }}
            style={{
              position: "absolute",
              top: "-30px",
              left: "1150px",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            Create
          </button>
          {data.map((item) => {
            return (
              <div key={item._id} className="order-list">
                <div>OR00001</div>
                <div>{new Date().toLocaleDateString()}</div>
                <div className="align r">{getUserDetails("district")}</div>
                <div className="align r">{getUserDetails("district")}</div>
                <div className="phone ph">{getUserDetails("phone")}</div>
                <div className="align r">{item.quantity}</div>
                <div className="align r p">
                  <span>₹</span>
                  {item.price}
                </div>
                <div className="align s">{item.service[0]}</div>

                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    findServiceArray(item._id);
                    showOrderhistory(true);
                  }}
                  className="align dot"
                >
                  <img className="eye" src={eye} alt="eye.svg" />
                </div>

                <div className="align del">
                  <img
                    onClick={() => {
                      showDeleteMessage(true);
                      setDeleteById(item._id);
                    }}
                    src="https://icon-library.com/images/delete-icon/delete-icon-13.jpg"
                    alt="delete.svg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <OrderSideBar />
      {deleteMessage && (
        <div className="message-box">
          <img
            style={{ float: "right", height: "14px", cursor: "pointer" }}
            src={cross}
            onClick={() => {
              showDeleteMessage(false);
            }}
            alt="cross"
          />
          <img
            style={{ height: "150px", width: "150px" }}
            src={cancel}
            alt="check.jpg"
          />
          <p style={{ color: "#0A1F44", fontSize: "24px", fontWeight: "bold" }}>
            Click on delete button to cancel your order.
          </p>
          <div className="delete">
            <button
              onClick={() => {
                deleteItem(deleteById);
              }}
            >
              delete
            </button>
          </div>
        </div>
      )}

      <OrderFooter />
      {orderHistory && (
        <div className="view-summary">
          <header className="view-header">Summary</header>
          <div className="view-address">
            <div className="bold">Store Location</div>
            <div className="bold">Store Address:</div>
            <div className="bold">Phone</div>
            <div>{getUserDetails("district")}</div>
            <div>{getUserDetails("address")}</div>
            <div>{getUserDetails("phone")}</div>
          </div>
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <img style={{ width: "100%" }} src={status} alt="pick-up-detail" />
          </div>
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <div className="view-order-details">order details :</div>
            <div className="view-details heading">
              <div>Product</div>
              <div>Service type</div>
              <div>quantity</div>
              <div>Price</div>
            </div>
            <div className="view-details details">
              <div>{serviceArray.product}</div>
              <div>{`${serviceArray.service} `}</div>
              <div>{serviceArray.quantity}</div>
              <div>&nbsp;&nbsp;{serviceArray.price}</div>
            </div>
            <div className="view-subtotal">
              <div>Sub total:</div>
              <div>{serviceArray.price}</div>
            </div>
            <div className="view-subtotal">
              <div>Pickup charges:</div>
              <div>60</div>
            </div>
            <div className="view-total-prize">
              <div>Total price</div>
              <div>Rs {serviceArray.price + 60}</div>
            </div>
            <div className="view-saved-address">
              <h6>Address</h6>
              <div>
                <h6 style={{ fontWeight: "700" }}>Home</h6>
                <p>{getUserDetails("address")}</p>
              </div>
            </div>
            <div className="view-footer">
              <button
                onClick={() => {
                  showOrderhistory(false);
                  setServiceArray({});
                }}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default OrderContent;
