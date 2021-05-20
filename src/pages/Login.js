import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { selectIsLoggedIn, signUp } from "./../features/user/userSlice";
import { signUpRequest } from "./../services/api";
import logo from "./../assets/images/logo.png";
import googleLogo from "./../assets/images/logo-google.png";
import facebookLogo from "./../assets/images/logo-facebook.png";
import { useHistory } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.css";

import { NotificationManager } from "react-notifications";

export default function Login() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const [mobileNumber, setMobileNumber] = useState("");

  const notifyUser = (header, message) => {
    NotificationManager.error(message, header, 5000, () => {
      // alert("callback");
    });
  };
  const signUpClick = async (e) => {
    e.preventDefault();

    // validate the entered mobileNumber
    if (mobileNumber) {
      let response = await signUpRequest(mobileNumber);

      //validate the response status
      if (response.status === 200) {
        dispatch(signUp(mobileNumber));
        history.push("/otp");
      } else if (response.status === 400) {
        notifyUser("Attention!", "Bad Request!");
      } else if (response.status === 401) {
        notifyUser("Attention!", "Unauthorized!");
      } else {
        notifyUser("Attention!", "Something goes wrong!");
      }
    } else {
      notifyUser("Attention!", "Please enter a valid Phone Number!");
    }
  };

  const doNothing = () => {};

  if (isLoggedIn) return <Redirect to={{ pathname: "/" }} />;

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo" width="60" />

      <div className="hero-text" style={styles.heroText}>
        <h2 style={styles.noMargin}>Your Meal.</h2>
        <h2 style={styles.noMargin}>Fresh and Tasty.</h2>
      </div>

      <form style={styles.form}>
        <PhoneInput
          country={"us"}
          value={mobileNumber}
          onChange={(phone) => setMobileNumber(phone)}
        />
        <button
          className="signbtn"
          style={styles.signBtn}
          onClick={signUpClick}
        >
          Sign up free
        </button>
      </form>

      <p style={styles.passText}>
        Already have an account? <a href="/reset">Log in</a>
      </p>

      <p style={styles.passText}>OR</p>

      <div style={styles.thirdPartyLoginContainer}>
        <button onClick={doNothing} style={styles.button}>
          <img
            alt={"facebook-logo"}
            style={styles.img}
            src={facebookLogo}
            width="30"
          />{" "}
          Continue with Facebook
        </button>
        <button onClick={doNothing} style={styles.button}>
          <img
            alt={"google-logo"}
            style={styles.img}
            src={googleLogo}
            width="30"
          />{" "}
          Continue with Google
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 0px 0px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    textAlign: "center",
    width: "330px",
    height: "160px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "1.5",
    color: "#1f1f1f",
  },
  noMargin: {
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  signBtn: {
    top: "350px",
    left: "759px",
    width: "370px",
    height: "50px",
    background: "#FF7010 0% 0% no-repeat padding-box",
    borderRadius: "29px",
    opacity: "1",
    border: "none",
    margin: "19px",
    color: "white",
  },

  passText: {
    top: "578px",
    left: "812px",
    width: "350px",
    height: "25px",
    fontFamily: "Poppins",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    font: "normal normal normal 12px/27px Poppins",
    letterSpacing: "0px",
    color: "#707070",
    textAlign: "center",
    opacity: "1",
  },
  thirdPartyLoginContainer: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #E2E2E2",
    borderRadius: "29px",
    top: "350px",
    left: "759px",
    width: "370px",
    height: "50px",
    borderRadius: "29px",
    opacity: "1",
    border: "none",
    margin: "19px",
    letterSpacing: "0px",
    color: "#2B2B2B",
  },
  img: {
    marginRight: "80px",
  },
};
