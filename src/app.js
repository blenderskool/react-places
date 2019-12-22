import React from 'react';
import { Search } from 'js-search';
import Map from './components/map';
import Sidebar from './components/sidebar';
import AddPlace from './components/add_place';

class App extends React.Component {

  constructor() {
    super();
    this.search = new Search('placeName');
    this.search.addIndex('placeName');
    this.state = {
      errMessage: '',
      showAddPlace: false,
      places: [],
      addPlace: null,
    };
  }

  fetchLocalStorage() {
    /**
     * Load the data from localStorage
     */
    const places = JSON.parse(localStorage.getItem('places'));

    if (!places) return;

    this.setState({
      places: [...this.state.places, ...places]
    });
  }

  componentDidMount() {
    /**
     * Fetch the data from the API
     */
    this.fetchLocalStorage();

    fetch('https://staging.23ml.in/api/places', {
      headers: {
        'idtoken': process.env.REACT_APP_23ML_KEY 
      }
    })
    .then(res => res.json())
    .then(places => {
      /**
       * Add the data as documents for the search and
       * merge it with the state
       */
      this.search.addDocuments(places);
      this.setState({ places: [...this.state.places, ...places] });
    })
    .catch(err => {
      /**
       * If error occurs, set is as errMessage
       */
      this.setState({ errMessage: err });
    })
  }
  
  toggleAddPlace(state) {
    this.setState({
      addPlace: null,
      showAddPlace: state
    });
  }

  handleSearch(e) {
    const val = e.target.value;

    /**
     * Search in the records, and update the state with the places found.
     * If the search field is empty, show all places
     */
    const searchPlaces = this.search.search(val);

    this.setState({
      places: val ? searchPlaces : this.search._documents
    });
  }

  handleMapClick(e) {
    if (!this.state.showAddPlace) return;

    this.setState({
      addPlace: {
        lat: e.lat,
        lng: e.lng,
      },
    });
  }

  handleAddPlace(place) {
    this.search.addDocument(place);
    this.setState({
      addPlace: null,
      places: [...this.state.places, place],
    });
  }

  render() {

    return (
      <div className="wrapper">
        {
          this.state.errMessage ?
          <div>{this.state.errMessage}</div> :
          <React.Fragment>
            {
              this.state.showAddPlace ?
              <AddPlace
                {...this.state.addPlace}
                onClose={() => this.toggleAddPlace(false)}
                onAdd={this.handleAddPlace.bind(this)}
                onLatLngChange={e => this.setState({ addPlace: {...e} })}
              /> :
              <Sidebar
                onSearch={this.handleSearch.bind(this)}
                places={this.state.places}
                onAddPlace={() => this.toggleAddPlace(true)}
              />
            }
            <Map
              places={this.state.showAddPlace ? [] : this.state.places}
              onClick={this.handleMapClick.bind(this)}
              marker={this.state.showAddPlace && this.state.addPlace ? { ...this.state.addPlace } : null}
            />
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
