import React, { Component } from 'react';
import './App.css';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { RentalStations } from './components/RentalStations';
import Search from './components/Search';

class App extends Component {
  componentDidUpdate() {
    console.log('Instant state: ', this.state.inputValue);
    console.log('Instant stations: ', this.state.stations);
    console.log('Instant station: ', this.state.station);
  }

  state = {
    stations: [],
    station: {},
    isStationViewOn: false,
    sortValue: '',
    inputValue: '',
  };
  //
  // Hakukentän toiminnallisuus
  //
  searchHandler = (event) => {
    console.log('Input value:', event.target.value);
    this.setState({
      inputValue: event.target.value,
    });
    // console.log("State:", this.state.inputValue);
  };

  render() {
    // const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    //   uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    //   cache: new InMemoryCache(),
    //   connectToDevTools: true,
    // });

    const client = new ApolloClient({
      uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
      cache: new InMemoryCache(),
    });

    client.query({
      query: gql`
        query bikes {
          bikeRentalStations {
            name
            stationId
            bikesAvailable
            spacesAvailable
          }
        }
      `,
    });
    // .then((result) => console.log(result));

    // const client = new ApolloClient({
    //   uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    // });

    // const filteredStations = this.state.stations.filter((station) => {
    //   return station.name
    //     .toLowerCase()
    //     .includes(this.state.inputValue.toLocaleLowerCase());
    // });
    return (
      <div className="App">
        <header>
          <h1>HSL Kaupunkipyörät</h1>
          <h2>Tiedot asemista</h2>
        </header>
        <ApolloProvider client={client}>
          <main>
            <Search
              searchHandler={this.searchHandler}
              inputValue={this.state.inputValue}
            />
            <ul className="rentalStations">
              <RentalStations />
            </ul>
          </main>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
