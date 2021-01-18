import { gql } from "@apollo/client";

export const GET_STATIONS = gql`
  query GetStations {
    bikeRentalStations {
      name
      stationId
      bikesAvailable
      spacesAvailable
    }
  }
`;
