import React from "react";
import "./profileCard.css";
import { BsShieldFillCheck, BsStarFill } from "react-icons/bs";
import placeHolderImg from "../../assets/img/portrait_placeholder.png";

export default function ProfileCard() {
  return (
    <div className="profileContainer">
      <div className="profileImgContainer">
        <img className="profileImg" src={placeHolderImg} alt="profile" />
      </div>
      <div className="profileInfo">
        <p>Maurizio Calcagno</p>
        <span>
          <BsShieldFillCheck /> verificato in 14 Aprile 2019
        </span>
        <span>
          <BsStarFill /> 4.3 / 24 recensioni
        </span>
      </div>
    </div>
  );
}
