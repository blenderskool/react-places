import React from 'react';
import './sidebar.css';

export default class Sidebar extends React.Component {

  render() {
    const { places, onSearch } = this.props;

    return (
      <div className="sidebar">
        <input
          type="search"
          placeholder="Search place..."
          onChange={onSearch}
        />

        <ul className="places">
          {
            places.map(place => (
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