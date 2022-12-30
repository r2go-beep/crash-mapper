
import './App.css';
import React  from 'react';

import { CrashStatistics } from './Components/CrashStatistics';
import { MapComponent } from './Components/MapComponent';

function App() {


  return (
    <div className="App">
      <div className="body">
        <div className="App-header">
          CrashMapper
        </div>
        <div className="Float-left">
          <CrashStatistics />
        </div>
        <div className="Float-right">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}


export default App;
