import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LoginComponent from "./LoginComponent";

function HeaderComponent() {
  return (
    <div className="header-container">
      <div className="logo-img">
        <img src="./logo512.png" />
        <span>Bhavya Ngo</span>
      </div>
      <ul>
        <li>
          <Button variant="text">
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </Button>
        </li>

        <li>
          <Button variant="text">
            <Link to="gallery" style={{ textDecoration: "none" }}>
              Gallery
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="text">
            <Link to="about" style={{ textDecoration: "none" }}>
              About Us
            </Link>
          </Button>
        </li>
        <li>
          <LoginComponent />
        </li>
      </ul>
    </div>
  );
}

export default HeaderComponent;
