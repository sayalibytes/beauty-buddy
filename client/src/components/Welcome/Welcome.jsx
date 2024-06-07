import "./Welcome.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import bbLogo from "../../assets/images/bb_logo.png";

function Welcome() {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate("/questionnaire");
  };

  return (
    <div className="bb">
      <div className="bb__welcome">
        <h2 className="bb__title">
          Welcome to <br />
          Beauty Buddy
        </h2>
        <p className="bb__tagline">
          One stop solution for all your skin care needs
        </p>
        <img className="bb__logo" src={bbLogo} alt="logo" />
      </div>
      <div className="bb__section">
        <h3 className="bb__heading">
          Turn your skincare <br /> routine into a habit{" "}
        </h3>
        <p className="bb__text">You are on your way to a healthier skin</p>
        <p className="bb__personal">Let's personalise your experience</p>
      </div>
      <button className="bb__continue" onClick={handleContinueClick}>
        continue
      </button>
    </div>
  );
}

export default Welcome;
