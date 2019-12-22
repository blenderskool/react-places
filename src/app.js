import React from 'react';
import { Search } from 'js-search';
import Map from './components/map';
import Sidebar from './components/sidebar';

class App extends React.Component {

  constructor() {
    super();
    this.search = new Search('_id');
    this.search.addIndex('placeName');
    this.state = {
      errMessage: '',
      places: []
    };
  }

  componentDidMount() {

    fetch('https://staging.23ml.in/api/places', {
      headers: {
        'idtoken': process.env.REACT_APP_23ML_KEY 
      }
    })
    .then(res => res.json())
    .then(places => {
      this.search.addDocuments(places);
      this.setState({ places });
    })
    .catch(err => {
      this.setState({ errMessage: err });
    })
  }

  handleSearch(e) {
    const searchPlaces = this.search.search(e.target.value);

    this.setState({
      places: searchPlaces.length ? searchPlaces : this.search._documents
    });
  }

  render() {

    return (
      <div className="wrapper">
        {
          this.state.errMessage ?
          <div>{this.state.errMessage}</div> :
          <React.Fragment>
            <Sidebar
              onSearch={this.handleSearch.bind(this)}
              places={this.state.places}
            />
            <Map places={this.state.places} />
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
