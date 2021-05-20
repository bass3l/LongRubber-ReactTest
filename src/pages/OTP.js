import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import {
  selectIsLoggedIn,
  selectPhoneNumber,
  login,
} from "./../features/user/userSlice";
import { loginRequest } from "./../services/api";
import logo from "./../assets/images/logo.png";
import "./style.css";

import { NotificationManager } from "react-notifications";

export default function OTP() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const phoneNumber = useSelector(selectPhoneNumber);
  const dispatch = useDispatch();
  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [fourthDigit, setFourthDigit] = useState("");

  const notifyUser = (header, message) => {
    NotificationManager.error(message, header, 5000, () => {
      // alert("callback");
    });
  };

  const validateDigit = (digit) => {
    if (digit.length > 1) {
      return false;
    }

    let code = digit.charCodeAt(0);
    if (code < 48 || code > 57) {
      return false;
    }
    return true;
  };

  const loginClick = async (e) => {
    e.preventDefault();

    // to ensure that user enter exact four
    if (firstDigit && secondDigit && thirdDigit && fourthDigit) {
      let otp = firstDigit + secondDigit + thirdDigit + fourthDigit;

      let response = await loginRequest(phoneNumber, otp);

      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        dispatch(login());
      }
    } else {
      notifyUser(
        "Attention!",
        "Please enter a valid OTP number with exact 4 digits"
      );
    }
  };

  if (isLoggedIn) return <Redirect to={{ pathname: "/" }} />;

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo" width="60" />

      <div className="hero-text" style={styles.heroText}>
        <h2 style={styles.noMargin}>OTP Verification</h2>
      </div>

      <p style={styles.resetPass}>
        Please Enter the <strong>One Time Password</strong> we sent to your
        mobile number
      </p>

      <form style={styles.form}>
        <div style={styles.codeInput}>
          <input
            className="input"
            style={styles.input}
            value={firstDigit}
            onChange={(e) => {
              if (validateDigit(e.target.value)) {
                setFirstDigit(e.target.value);
              } else {
                notifyUser("Attention!", "Please enter a digit from 0 to 9");
              }
            }}
          />
          <input
            className="input"
            style={styles.input}
            value={secondDigit}
            onChange={(e) => {
              if (validateDigit(e.target.value)) {
                setSecondDigit(e.target.value);
              } else {
                notifyUser("Attention!", "Please enter a digit from 0 to 9");
              }
            }}
          />
          <input
            className="input"
            style={styles.input}
            value={thirdDigit}
            onChange={(e) => {
              if (validateDigit(e.target.value)) {
                setThirdDigit(e.target.value);
              } else {
                notifyUser("Attention!", "Please enter a digit from 0 to 9");
              }
            }}
          />
          <input
            className="input"
            style={styles.input}
            value={fourthDigit}
            onChange={(e) => {
              if (validateDigit(e.target.value)) {
                setFourthDigit(e.target.value);
              } else {
                notifyUser("Attention!", "Please enter a digit from 0 to 9");
              }
            }}
          />
        </div>
        <button
          className="signbtn"
          style={styles.verfiyBtn}
          onClick={loginClick}
        >
          Verify
        </button>
      </form>

      <p style={styles.resend}>
        Didn't receive the OTP? <a href="/resend-otp">Resend OTP</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    textAlign: "center",
    width: "330px",
    height: "100px",
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
  resetPass: {
    textAlign: "center",
    width: "350px",
    padding: "10px 90px",
    color: "#666666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  codeInput: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    margin: "20px 0px",
  },
  verfiyBtn: {
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
  resend: {
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
  input: {
    width: "30px",
    padding: "17px",
    textAlign: "center",
    margin: "6px 21px",
    borderRadius: "1rem",
    border: "2px solid white",
  },
};
