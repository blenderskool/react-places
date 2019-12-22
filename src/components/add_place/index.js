import React from 'react';
import './add_place.css';

export default class AddPlace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      latLng: '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { lat, lng } = props;
    if (!lat || !lng) return null;

    const latLng = `${lat}, ${lng}`;

    /**
     * If current latLng is same as new latLng, don't update the state
     */
    if (latLng === state.latLng) return null;

    console.log(latLng, state.latLng);
    return { latLng };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { lat, lng, onAdd, onClose } = this.props;

    /**
     * Store the data in localStorage
     */
    let places = JSON.parse(localStorage.getItem('places'));
    const place = {
      placeName: this.state.name,
      location: {
        Lat: lat,
        Lng: lng,
      },
    };

    /**
     * If some data exists in localStorage, merge the new place with
     * exisiting data
     */
    if (places)
      places.push(place);
    else
      places = [ place ];

    localStorage.setItem('places', JSON.stringify(places));
    onAdd(place);
    onClose();
  }

  handleLatLngChange(e) {
    /**
     * When the Location input changes, modify the state
     * and send the updated latLng to parent component
     */
    const val = e.target.value;
    const loc = val.split(/\s*,\s*/);

    this.setState({ latLng: val });
    this.props.onLatLngChange({
      lat: loc[0],
      lng: loc[1],
    });
  }

  render() {
    const { onClose } = this.props;
    const formId = 'addPlace';

    return (
      <div className="sidebar">
        <button className="btn no-outline icon" onClick={onClose}>
          <i className="icon ion-md-arrow-back" />
        </button>

        <form id={formId} ref={el => this.form = el} onSubmit={this.handleSubmit.bind(this)}>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td align="right">
                  <input
                    type="text"
                    required
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td>Location</td>
                <td align="right">
                  <input
                    type="text"
                    required
                    value={this.state.latLng}
                    onChange={this.handleLatLngChange.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <div className="actions">
          <button
            className="btn"
            onClick={onClose}
            style={{backgroundColor: '#e91e63'}}
          >
            Cancel
          </button>
          <button className="btn" form={formId} >
            Save
          </button>
        </div>
      </div>
    );
  }
}