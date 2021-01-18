// import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { GET_BIKES } from "../graphql/get-bikes";

// export function RentalStations() {
//   const { data: { bikes = [] } = {} } = useQuery(GET_BIKES);
//   // console.log(GET_BIKES);
//   // console.log(bikes);
//   // return <div className="bikes">{bikes.map((bike) => console.log(bike))}</div>;
//   return <div>{bikes.map((bike) => console.log(bike))}</div>;
// }
// export default RentalStations;
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_STATIONS } from "../graphql/get-stations";

// const GET_STATIONS = gql`
//   query GetStations {
//     bikeRentalStations {
//       name
//       stationId
//       bikesAvailable
//       spacesAvailable
//     }
//   }
// `;

export function RentalStations() {
  //Otetaan käyttöön GET_STATIONS query
  const { loading, error, data } = useQuery(GET_STATIONS, {
    //Päivittää grapghql datan haun
    pollInterval: 5000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.bikeRentalStations.map((props) => (
    <li key={props.stationId} className="bikeStation">
      <h4>{props.name}</h4>
      <p>Pyöriä vapaana: {props.bikesAvailable}</p>

      <p>Vapaita paikkoja: {props.spacesAvailable}</p>
    </li>
  ));
}

export default RentalStations;
