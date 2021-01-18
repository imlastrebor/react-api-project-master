import React from "react";

const bikeStation = (props) => (
  <div className="BikeStation">
    <h4>{props.stationName}</h4>
    <p>Pyöriä vapaana: {props.bikesAvailable}</p>
    <p>Vapaita paikkoja: {props.spacesAvailable}</p>
  </div>
);

export default bikeStation;
