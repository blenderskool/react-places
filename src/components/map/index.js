import React from 'react';
import GoogleMapReact from 'google-map-react';
import './map.css';

function Marker({ placeName }) {
  return <div className="marker" tabIndex="-1" dataname={placeName} />;
}

export default class Map extends React.Component {

  static defaultProps = {
    center: {
      lat: 26.19,
      lng: 91.69
    },
    zoom: 15
  };

  render() {
    const { places, marker, onClick, center, zoom } = this.props;

    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={onClick}
        >
          {
            places.map(place => (
              <Marker
                key={place.placeName}
                lat={place.location.Lat}
                lng={place.location.Lng}
                placeName={place.placeName}
              />
            ))
          }
          {
            marker ?
            <Marker
              lat={marker.lat}
              lng={marker.lng}
            /> :
            null
          }
        </GoogleMapReact>
      </div>
    );
  }

}