import "./header.css";

import { useState } from "react";

import logoImage from "../assets/logo/logo.png";
import searchIcon from "../assets/icon/search.png";

export function HeaderComponent() {
  const { isOver, setIsOver } = useState(false);

  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <img src={logoImage} alt="starbucks logo image" />
        </div>
        <div className="header__nav">
          <div className="header__nav-top">
            <div className="header__nav-top--item">Sign In</div>
            <div className="header__nav-top--item">My Starbucks</div>
            <div className="header__nav-top--item">
              Customer Service & Ideas
            </div>
            <div className="header__nav-top--item">Find a Store</div>
            <div className="header__nav-top--icon">
              <img src={searchIcon} alt="" />
            </div>
          </div>
          <div className="header__nav-bottom"></div>
        </div>
      </div>
    </div>
  );
}
