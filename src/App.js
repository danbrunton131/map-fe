import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import MainPage from './Components/MainPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Hello, World! </h1>
      </header>
      <div className="App-body">
        <MainPage/>
      </div>
      <div className="App-footer">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      </div>
    </div>
  );
}

export default App;
