import React from 'react';
import logo from './logo.svg';
import './css/custom.css';
import './css/App.css';
/*import './css/mcmaster.css';*/
import MainPage from './Components/MainPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="maroon"> MAP Calculator </h1>
      </header>
      <div className="App-body">
        <MainPage/>
      </div>
    </div>
  );
}

export default App;
