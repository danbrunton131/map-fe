import React, {Component} from 'react';
import './css/custom.css';
import './css/App.css';
import MainPage from './Components/MainPage';
import ErrorMessage from './common/ErrorMessage';
import {fetchAllCourses} from './api/courses-api';
import {getCurrentTime, getTermCourseList} from './common/utilities';

export default class App extends Component {
  constructor() {
    super();
    this.state={
      title: null,
      allCourses: null,
      error: null,
    }
  }

  componentDidMount(){
    fetchAllCourses().then(res => {
      if (res.data.error){
        const error = {message: 'The Calculator ID specified does not exist!', key: getCurrentTime()};
        this.setState({error});
      } else {
        const allCourses = {
          fall: getTermCourseList(res.data.courseLists.Fall), 
          winter: getTermCourseList(res.data.courseLists.Winter),
          spring: getTermCourseList(res.data.courseLists.Spring),
          summer: getTermCourseList(res.data.courseLists.Summer),
        };
        this.setState({allCourses, title: res.data.calcTitle});
      }
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
  }

  showErrorMessage(message){
    this.setState({error: message});
  }
  
  render(){
    const {title, error, allCourses} = this.state;
    console.log(this.state.error);

    return (
      <div className="App">
        <header className="App-header" role="banner">
          <h1 className="maroon"> {title} </h1>
        </header>
        <div className="App-body" role="main"> 
          {error && <ErrorMessage 
              key={error.key} // this is used as a key to handle subsequent "identical" messages
              timeout={error.timeout}
              message={error.message}
          /> }
          {allCourses && <MainPage allCourses={allCourses} showErrorMessage={this.showErrorMessage.bind(this)}/>}
        </div>
      </div>
    );
  }

}
