import React, { useState } from "react";

import CodIcon from "../../assets/IconCheckoutOption/cod.svg";
import BankIcon from "../../assets/IconCheckoutOption/bank.svg";

import useInput from "../../hook/use-input";

import styles from "./OrderInfo.module.css";

const isNotEmpty = (value) => value.trim().length !== 0;
const isEmail = (value) => value.includes("@");

const OrderInfo = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameIsInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const [shippingMethod, setShippingMethod] = useState("");
  const [payMethod, setPayMethod] = useState("");

  let orderIsValid = false;

  if (
    nameIsValid &&
    emailIsValid &&
    shippingMethod !== "" &&
    payMethod !== ""
  ) {
    orderIsValid = true;
  }

  const selectShippingMethod = (event) => {
    setShippingMethod(event.target.value);
  };

  const selectPayMethod = (event) => {
    setPayMethod(event.target.value);
  };

  const orderHandler = () => {
    // console.log("OrderInfo");
    const CustomerInfo = {
      name: enteredName,
      email: enteredEmail,
      shippingMethod: shippingMethod,
      payMethod: payMethod,
    };

    props.onSendOrder(CustomerInfo);
  };

  const fullNameClasses = `${styles["field-input"]} ${
    !nameIsInvalid ? "" : styles["field-input-invalid"]
  }`;

  const emailClasses = `${styles["field-input"]} ${
    !nameIsInvalid ? "" : styles["field-input-invalid"]
  }`;

  const classButtonOrder = `${styles.orderButton} ${
    !orderIsValid && styles.btnDisable
  }`;
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles["content-header"]}>
          <h2>Order information</h2>
        </div>
        <div className={styles["input-content"]}>
          <div className={styles.field}>
            <div className={styles["field-input-wrapper"]}>
              <label
                className={styles["field-label"]}
                htmlFor="order-full-name"
              ></label>
              <input
                className={fullNameClasses}
                id="order-full-name"
                type="text"
                placeholder="Full Name"
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              ></input>
              {nameIsInvalid && (
                <p className={styles["notice-input-invalid"]}>
                  Please enter your name.
                </p>
              )}
            </div>
          </div>
          <div className={`${styles.field} ${styles["field-two-third"]}`}>
            <div className={styles["field-input-wrapper"]}>
              <label
                className={styles["field-label"]}
                htmlFor="order-email"
              ></label>
              <input
                className={emailClasses}
                id="order-email"
                type="email"
                placeholder="Email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              ></input>
              {emailIsInvalid && (
                <p className={styles["notice-input-invalid"]}>
                  Please enter a valid email.
                </p>
              )}
            </div>
          </div>
          <div className={`${styles.field} ${styles["field-one-third"]}`}>
            <div className={styles["field-input-wrapper"]}>
              <label
                className={styles["field-label"]}
                htmlFor="order-phone"
              ></label>
              <input
                disabled
                className={styles["field-input"]}
                id="order-phone"
                type="text"
                placeholder="Phone Number (NO NEED)"
              ></input>
            </div>
          </div>
        </div>
        <div id="option-order">
          <div
            className={styles["option-shipping"]}
            onChange={selectShippingMethod}
          >
            <h2>Way of shipping</h2>
            <div className={styles.content}>
              <div className={styles["content-box"]}>
                <div className={styles["content-box-row"]}>
                  <div className={styles["radio-wrapper"]}>
                    <label
                      className={`${styles["radio-label"]} ${styles["pd-4"]}`}
                    >
                      <div
                        className={`${styles["radio-input"]} ${styles["mt-10"]}`}
                      >
                        <input
                          className={styles["input-radio"]}
                          id="ship-at-door"
                          type="radio"
                          name="way-shipping"
                          value="standard"
                        ></input>
                        <span className={styles["radio-label-primary"]}>
                          Standard shipping
                        </span>
                      </div>
                      <span className={styles["radio-accessory"]}>0$</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles["option-payment-method"]}
            onChange={selectPayMethod}
          >
            <h2>Payment method</h2>
            <div className={styles.content}>
              <div className={styles["content-box"]}>
                <div className={styles["content-box-row"]}>
                  <div className={styles["radio-wrapper"]}>
                    <label className={styles["radio-label"]}>
                      <div
                        className={`${styles["radio-input"]} ${styles["mt-20"]}`}
                      >
                        <input
                          className={styles["input-radio"]}
                          id="cod"
                          type="radio"
                          name="payment-method"
                          value="cod"
                        ></input>
                        <img src={CodIcon} alt="cod" />
                        <span className={styles["radio-label-primary"]}>
                          Cash On Delivery (COD)
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className={styles["content-box-row"]}>
                  <div className={styles["radio-wrapper"]}>
                    <label className={styles["radio-label"]}>
                      <div
                        className={`${styles["radio-input"]} ${styles["mt-20"]}`}
                      >
                        <input
                          className={styles["input-radio"]}
                          id="bank"
                          type="radio"
                          name="payment-method"
                          value="bank"
                        ></input>
                        <img src={BankIcon} alt="bank"></img>
                        <span className={styles["radio-label-primary"]}>
                          Pay by Credit Card
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.orderButtonControl}>
        <button
          className={`btn btn-secondary ${classButtonOrder}`}
          onClick={orderHandler}
          disabled={!orderIsValid}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderInfo;
