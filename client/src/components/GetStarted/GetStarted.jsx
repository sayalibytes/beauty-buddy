import "./GetStarted.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import getStarted from "../../assets/images/get-started.png";

function GetStarted() {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate("/home");
  };
  return (
    <div className="bb">
      <div className="bb__section">
        <h3 className="bb__heading"> Here We Go </h3>
        <p className="bb__text">You journey to a healthier skin starts now.</p>
      </div>
      <div className="bb__welcome">

      <img className="bb__img" src={getStarted} alt="get-started" />
      </div>
      <button className="bb__continue" onClick={handleContinueClick}>
        Let's get started
      </button>
    </div>
  );
}

export default GetStarted;
