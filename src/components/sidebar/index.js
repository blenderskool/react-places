import React from 'react';
import './sidebar.css';

export default class Sidebar extends React.Component {

  render() {
    const { places, onSearch, onAddPlace } = this.props;

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
}