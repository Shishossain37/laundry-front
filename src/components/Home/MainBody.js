import React, { useState } from "react";
import lock from "../../images/lock.png";
import fb from "../../images/facebook.svg";
import insta from "../../images/instagram.svg";
import linkedin from "../../images/linkedin.svg";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
function MainBody() {
  const [checked, isChecked] = useState("");
  const [registerPage, showRegisterPage] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (checked) {
      if (userData.password !== userData.confirmPassword) {
        return M.toast({ html: "Password & confirmpassword not matched" });
      } else {
        sendData(userData);
      }
    } else {
      alert("please click in checkbox");
    }
  };
  const sendData = (data) => {
    fetch("https://laundry-fyit.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          M.toast({ html: result.error, classes: "#d50000 red accent-4" });
        } else {
          // alert(result.message)
          M.toast({ html: result.message, classes: "#1976d2 blue darken-2" });

          showRegisterPage(false);
          // emptyUserDataField()
        }
      })
      .catch((err) => console.log(err));
  };
  // const emptyUserDataField = () => {
  //     let initialUserData = {}
  //     for (let x in userData) {
  //         initialUserData[x] = ""
  //     }
  //     // console.log(initialUserData)
  //     setUserData(initialUserData)
  //     navigate("/order")

  // }

  const signIn = (e) => {
    e.preventDefault();
    fetch("https://laundry-fyit.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem("jwt", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          M.toast({
            html: "successfully logged in",
            classes: "#1976d2 blue darken-2",
          });
          // setEmail("")
          // setPassword("")
          navigate("/ordercontent");
        }
        if (result.error) {
          M.toast({ html: result.error, classes: "#d50000 red accent-4" });
        }
      });
  };

  return (
    <>
      <Navbar />
      <section id="main-body">
        <section id="laundry-section">
          <h1>Laundry service</h1>
          <p>Doorstep Wash & Dryclean Service</p>
          {registerPage ? (
            <h6>Already Have An Account?</h6>
          ) : (
            <h6>Don't Have An Account?</h6>
          )}

          {!registerPage && (
            <button
              style={{ float: "left", marginLeft: "10px" }}
              onClick={() => showRegisterPage(true)}
            >
              Register
            </button>
          )}
          {registerPage && (
            <button
              style={{ float: "left", marginLeft: "10px" }}
              onClick={() => showRegisterPage(false)}
            >
              Sign in
            </button>
          )}
        </section>
        {!registerPage && (
          <section id="form-section">
            <h3>SIGN IN</h3>

            {/* sign in form */}

            <form onSubmit={(e) => signIn(e)}>
              <div>
                <label htmlFor="mobileNo">email</label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label>Password</label>
                <img
                  src={lock}
                  alt="lock/png"
                  style={{ position: "relative", left: "240px", top: "12px" }}
                />

                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <h6
                style={{
                  position: "relative",
                  left: "180px",
                  top: "-15px",
                  color: "#4552C1",
                  fontWeight: "500",
                }}
              >
                forgot password
              </h6>
              <div>
                <button
                  style={{
                    position: "relative",
                    left: "80px",
                    top: "30px",
                    backgroundColor: "#4552C1",
                  }}
                  className="btn"
                  type="submit"
                >
                  Signin
                </button>
              </div>
            </form>
          </section>
        )}
        {registerPage && (
          <section>
            <h3
              style={{ position: "relative", top: "-90px", color: "#5861AE" }}
            >
              Register
            </h3>

            {/* Register form */}
            <form
              id="register-form"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, name: e.target.value };
                    });
                  }}
                  value={userData.name}
                />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, email: e.target.value };
                    });
                  }}
                  value={userData.email}
                />
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, phone: e.target.value };
                    });
                  }}
                  value={userData.phone}
                />
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, state: e.target.value };
                    });
                  }}
                  value={userData.state}
                />
              </div>
              <div className="form-field">
                <label>District</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, district: e.target.value };
                    });
                  }}
                  value={userData.district}
                />
              </div>
              <div className="form-field">
                <label>Address</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, address: e.target.value };
                    });
                  }}
                  value={userData.address}
                />
              </div>
              <div className="form-field">
                <label>Pincode</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, pincode: e.target.value };
                    });
                  }}
                  value={userData.pincode}
                />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, password: e.target.value };
                    });
                  }}
                  value={userData.password}
                />
              </div>
              <div className="form-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, confirmPassword: e.target.value };
                    });
                  }}
                  value={userData.confirmPassword}
                />
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    onClick={(e) => isChecked(e.target.checked)}
                  />
                  <span></span>
                </label>
                <span
                  style={{
                    fontSize: ".7rem",
                    position: "relative",
                    top: "-9px",
                    left: "-5px",
                    color: "#5861AE",
                  }}
                >
                  I agree to Terms & Condition receiving marketing and
                  promotional materials
                </span>
              </div>
              <div>
                <button
                  style={{
                    position: "relative",
                    left: "-200px",
                    backgroundColor: "#4552C1",
                  }}
                  className="btn"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </section>
        )}
      </section>
      <footer>
        <div className="terms">
          <p style={{ fontSize: "16px", color: "#5861AE" }}>
            Now Refer & Earn ₹500 for every referral*
          </p>
          <p style={{ fontSize: "10px" }}>
            * Terms and conditions will be applied
          </p>
        </div>
        <div className="links">
          <h5>ABOUT US</h5>
          <h5 className="small">HOME</h5>
          <h5 className="small">PRICING</h5>
          <h5 className="small">CAREER</h5>
          <h5 className="small">CONTACT</h5>
          <h5>SOCIAL MEDIA</h5>
        </div>
        <div className="Routes">
          <h5>Doorstep Wash & Dryclean Service</h5>
          <h5>Signin</h5>
          <h5 style={{ position: "relative", left: "-27px" }}>Blogs</h5>
        </div>
        <div className="social-media">
          <img src={linkedin} alt="linkedin" />
          <img src={insta} alt="instagram" />
          <img src={fb} alt="fb" />
        </div>
        <div className="create-register">
          <h6>Register</h6>
          <h6>Create</h6>
        </div>
        <div className="order-footer">
          <p>2023 &#169; Laundry</p>
        </div>
      </footer>
    </>
  );
}
export default MainBody;
