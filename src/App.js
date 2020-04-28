import React, { Component } from "react"
import logo from './logo.svg';
import './css/custom.css';
import './css/App.css';
import MainPage from './Components/MainPage';
import {fetchAllCourses} from './api/courses-api';

export const getTermCourseList = (termCoursesByProgram) => {
  let allTermCourses = [];
  for (let classType in termCoursesByProgram){ 
    const classTypeList = termCoursesByProgram[classType];
    for (let i=0; i<classTypeList.length;i++){ //i is the course itself
      allTermCourses.push({...classTypeList[i], key:classTypeList[i].courseID});
    }
  }
  return allTermCourses;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calcTitle: null,
    };

}
componentDidMount(){
    fetchAllCourses().then(res => {
      console.log(res);

      if (res.data.error){
        const error = {message: 'The Calculator ID specified does not exist!'};
        this.setState({error});
      } else {
        const allCourses = {
          fall: getTermCourseList(res.data.courseLists.Fall), 
          winter: getTermCourseList(res.data.courseLists.Winter),
          spring: getTermCourseList(res.data.courseLists.Spring),
          summer: getTermCourseList(res.data.courseLists.Summer),
        };
        this.setState({allCourses, calcTitle: res.data.calcTitle});
      }
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
  }

    render(){ 
      return(
      <div className="App">
        <header className="App-header" role="banner">
          <h1 className="maroon"> {this.state.calcTitle ? this.state.calcTitle : "MAP Calculator"} </h1>
        </header>
        <div className="App-body" role="main"> 
          <MainPage/>
        </div>
      </div>
    );
  }


}