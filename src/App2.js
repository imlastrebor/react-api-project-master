import React, { Component } from "react";
import "./App.css";
import Person from "./person/Person";
import { createApolloFetch } from "apollo-fetch";
import BikeStation from "./BikeStations";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BikesContainer } from "./components/RentalStations";
// import axios from "axios";

//
// TOIMIVA DATAN HAKU!!!!!
//
//
// const { createApolloFetch } = require("apollo-fetch");

// const fetch = createApolloFetch({
//   uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
// });

// fetch({
//   query: "{ bikeRentalStations { name }}",
// }).then((res) => {
//   console.log(res.data);
// });

class App extends Component {
  state = {
    persons: [
      { name: "Robert", age: "27" },
      { name: "Anni", age: "24" },
      { name: "Manta", age: "68" },
    ],
    //Tyhjä array apista tulevaa dataa varten
    bikes: [],
  };

  componentDidMount() {
    //
    // Apollo 3.0 tapa hakea tietoja
    //

    //
    //
    //Tietojen haku rajapinnasta TAPA 1
    //
    // const fetch = createApolloFetch({
    //   uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    // });

    // fetch({
    //   query: "{ bikeRentalStations { name, bikesAvailable }}",
    // }).then((res) => {
    //   console.log(res.data.bikeRentalStations.map((name) => name));
    //   console.log(res.data.bikeRentalStations);
    //   console.log(res.data.bikeRentalStations[0].name);
    //   this.setState({ bikes: res.data.bikeRentalStations });
    // });
    //
    //
    //Tietojen haku rajapinnasta TAPA 2
    //
    const uri =
      "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

    const query = `
  query BikesAvailable {
    bikeRentalStations {
      name,
      stationId,
      bikesAvailable,
      spacesAvailable
    }
  }
`;
    const apolloFetch = createApolloFetch({ uri });

    apolloFetch({ query }).then((res) => {
      this.setState({ bikes: res.data.bikeRentalStations });
    });
  }

  switchNameHandler = () => {
    this.setState({
      persons: [
        { name: "asd", age: "34hfgh" },
        { name: "dfgdfg", age: "435dgf" },
        { name: "gdfgdfgdfg", age: "345dfg" },
      ],
    });
  };

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: "Robert", age: "27" },
        { name: event.target.value, age: "24" },
        { name: "Manta", age: "68" },
      ],
    });
  };
  render() {
    const client = new ApolloClient({
      uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
      connectToDevTools: true,
    });

    const bikes = this.state.bikes.map((station, i) => {
      // console.log(station.bikesAvailable);
      return (
        <BikeStation
          stationName={station.name}
          bikesAvailable={station.bikesAvailable}
          spacesAvailable={station.spacesAvailable}
          key={i}
        />
      );
    });
    return (
      <div className="App">
        <h1>React project</h1>
        <h2>Apollo 3.0</h2>
        <ApolloProvider client={client}>
          <main>
            <BikesContainer />
          </main>
        </ApolloProvider>

        <h2>HSL Kaupunkipyörät</h2>

        <main>
          <section className="bikeStations">{bikes}</section>
        </main>

        <h2>Persons</h2>
        <button onClick={this.switchNameHandler}>Change name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler}
          changed={this.nameChangedHandler}
        />
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
          click={this.switchNameHandler}
        />
      </div>
    );
  }
}

export default App;
