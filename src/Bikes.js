import React from "react";
import { createApolloFetch } from "apollo-fetch";

const fetch = createApolloFetch({
  uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
});

fetch({
  query: "{ bikeRentalStations { name }}",
}).then((res) => {
  //   console.log(res.data.bikeRentalStations.map((name) => name));
  //   console.log(res.data.bikeRentalStations);
  //   console.log(res.data.bikeRentalStations[0].name);
});

const Bikes = () => <p>{fetch}</p>;

export default Bikes;
