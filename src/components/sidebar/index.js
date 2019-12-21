import React from 'react';
import './sidebar.css';

export default class Sidebar extends React.Component {
  
  render() {

    return (
      <div className="sidebar">
        <input
          type="search"
          placeholder="Search place..."
        />

        <ul className="places">
          {
            this.props.places.map(place => (
              <li key={place._id}>
                {place.placeName}
              </li>
            ))
          }
        </ul>

        <button className="btn add-place">
          Add place
        </button>
      </div>
    );
  }
}