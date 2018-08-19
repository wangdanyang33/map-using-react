import React, { Component } from 'react';
import NeighborhoodMap from './NeighborhoodMap';
import Sidebar from './Sidebar';

const mapApiUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQq6OPvhQQODVfevWGGSXgNw9ERQu4fOw&v=3&libraries=places'
const locations = [
    {
      id: "costco",
      name: "Foster City Costco",
      description: "Costco in Foster City, CA"
    },     
    {
      id: "fire-station",
      name: "Foster City Fire Station",
      description: "Fire Station in Foster City, CA"
    },     
    {
      id: "happy-lemon",
      name: "Happy Lemon",
      description: "Happy Lemon in Foster City, CA"
    },
    {
      id: "pier-one",
      name: "Pier One Imports",
      description: "Pier One Imports in Foster City, CA"
    },
    {
      id: "dog-park",
      name: "Foster City Dog Park",
      description: "Dog Park in Foster City, CA"
    },
    {
      id: "edgewater-park",
      name: "Edgewater Park",
      description: "Edgewater Park in Foster City, CA"
    }
]

class App extends Component {
  state = {
    activeLocations: locations,
    selectedLocation: null
  }
  onLocationFiltered = (newLocations) => {
    this.setState({activeLocations: newLocations})
  }
  onClickLocation = (location) => {
    this.setState({selectedLocation: location})
  }
  render() {
    return (
      <div className="map-container">
        <NeighborhoodMap
          locations={this.state.activeLocations}
          selectedLocation={this.state.selectedLocation}
          onClickLocation={this.onClickLocation}
          googleMapURL={mapApiUrl}
          loadingElement={<div className="loading" />}
          containerElement={<div className="map-container" />}
          mapElement={<div id="map" />}
        />
        <Sidebar allLocations={locations} onLocationFiltered={this.onLocationFiltered} onClickLocation={this.onClickLocation} />
      </div>
    );
  }
}

export default App;
