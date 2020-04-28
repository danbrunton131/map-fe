import React, {Component} from 'react';
import './css/custom.css';
import './css/App.css';
import MainPage from './Components/MainPage';

export default class App extends Component {
  constructor() {
    super();
    this.state={}
  }

  setCalculatorTitle = (title) => {
    this.setState({title});
  }
  
  render(){
    const {title} = this.state;

    return (
      <div className="App">
        <header className="App-header" role="banner">
          <h1 className="maroon"> {title} </h1>
        </header>
        <div className="App-body" role="main"> 
          <MainPage setCalculatorTitle={this.setCalculatorTitle.bind(this)}/>
        </div>
      </div>
    );
  }

}
