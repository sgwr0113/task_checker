import React from "react";
import DoneAll from "@material-ui/icons/DoneAll";
import "./style.css";

export const Header = () => {
  return (
    <div className="header flex horizontal_center vertical_center">
      <DoneAll className="header_icon" fontSize="large"></DoneAll>
      <span className="header_title">Task Checker</span>
    </div>
  );
};