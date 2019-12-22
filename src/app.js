import React from 'react';
import Map from './components/map';
import Sidebar from './components/sidebar';

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
