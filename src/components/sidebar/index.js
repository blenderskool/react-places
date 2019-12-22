import React from 'react';
import './sidebar.css';

export default function Sidebar({ places, onSearch, onAddPlace }) {

  return (
    <div className="sidebar">
      <input
        type="search"
        placeholder="Search place..."
        onChange={onSearch}
      />
      
      <ul className="places">
        {
          places.length ?
          places.map(place => (
            <li key={place.placeName}>
              {place.placeName}
            </li>
          )) :
          'No place found'
        }
      </ul>

      <button className="btn add-place" onClick={onAddPlace}>
        Add place
        <i className="icon ion-md-add" />
      </button>
    </div>
  );
}