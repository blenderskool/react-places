import React from 'react';
import GoogleMapReact from 'google-map-react';
import './map.css';

function Marker({ placeName }) {
  return <div className="marker" tabIndex="-1" dataname={placeName} />;
}

export default function Map({ places, marker, onClick}) {

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
        defaultCenter={{ lat: 26.19, lng: 91.69 }}
        defaultZoom={15}
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
            lat={marker.lat ? marker.lat : 0}
            lng={marker.lng ? marker.lng : 0}
          /> :
          null
        }
      </GoogleMapReact>
    </div>
  );
}