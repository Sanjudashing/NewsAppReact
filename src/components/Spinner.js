import React, { Component } from "react";
// import Spinner from "./components/Spinner";

const Spinner = () => {
  return (
    <div>
      <div className="container d-flex justify-content-center">
        <div className="spinner-grow " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
