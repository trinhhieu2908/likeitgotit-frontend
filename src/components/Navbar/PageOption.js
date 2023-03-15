import React from "react";
import { NavLink } from "react-router-dom";

const PageOption = (props) => {
  return (
    <React.Fragment>
      <li className="nav-item" onClick={props.onClose}>
        <NavLink className="nav-link" to="/home" exact id='home-page'>
          <i className="fas fa-tachometer-alt"></i>Home
        </NavLink>
      </li>
      <li className="nav-item" onClick={props.onClose} >
        <NavLink className="nav-link" to="/shop/products" exact id='shop-page'>
          <i className="fas fa-store"></i>Shop
        </NavLink>
      </li>
      <li className="nav-item" onClick={props.onClose}>
        <NavLink className="nav-link" to="/checkout" exact id='checkout-page'>
          <i className="fas fa-money-bill-wave"></i>Checkout
        </NavLink>
      </li>
      <li className="nav-item" onClick={props.onClose}>
        <NavLink className="nav-link" to="/about" exact id='about-page'>
          <i className="fas fa-info-circle"></i>About
        </NavLink>
      </li>
      <li className="nav-item" onClick={props.onClose}>
        <NavLink className="nav-link" to="/contact" exact id='contact-page'>
          <i className="far fa-address-book"></i>Contact Us
        </NavLink>
      </li>
    </React.Fragment>
  );
};

export default PageOption;
