import React from 'react';
import logo from './logo.svg';
import './css/custom.css';
import './css/App.css';
import MainPage from './Components/MainPage';

function App() {
  return (
    <div className="App">
      <header className="App-header" role="banner">
        <h1 className="maroon"> MAP Calculator </h1>
      </header>
      <div className="App-body" role="main"> 
        <MainPage/>
      </div>
    </div>
  );
}

export default App;
