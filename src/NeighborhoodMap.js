import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import LocationPin from './LocationPin'

const NeighborhoodMap = withScriptjs(withGoogleMap(props => {
  const googleMaps = window.google && window.google.maps
  if (!googleMaps) {
    return
  }
  const mapConfig = {
    fullscreenControl: false,
    mapTypeControlOptions: {position: googleMaps.ControlPosition.TOP_RIGHT},
  }

  return (
    <GoogleMap
      defaultZoom={14}
      defaultOptions={mapConfig}
      center={{ lat: 37.55, lng: -122.27 }}>
      {props.locations.map(location => 
        <LocationPin
          key={location.id}
          location={location}
          googleMaps={googleMaps}
          selectedLocation={props.selectedLocation}
          onClickLocation={props.onClickLocation} />)}
    </GoogleMap>
  )
}))

export default NeighborhoodMap
