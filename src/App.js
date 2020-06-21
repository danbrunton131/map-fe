import React, {Component} from 'react';
import './css/custom.css';
import './css/App.css';
import MainPage from './Components/MainPage';
import ErrorMessage from './common/ErrorMessage';
import {fetchAllCourses} from './api/courses-api';
import {getCurrentTime, getTermCourseList} from './common/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Popover, OverlayTrigger } from 'react-bootstrap';

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

    const popover = (
      <Popover className="about-popover" id="popover-basic">
        <Popover.Title as="h3">McMaster Academic Planner Calculator</Popover.Title>
        <Popover.Content>
          <p>
            The MAP Calculator is a tool to help students and prospective students learn about
            their options in relation to university programs and program requirements.
          </p>
          <p>
            To use this tool, a list of courses are displayed based on semester that they are offered.
            You can get information about these courses and learn about them through the expanded course view.
            Then you can add them to the course cart for use in calculating the percentage of completion 
            of various programs. 
          </p>
          <p>
            The search bar can also be used to discover courses you are interested in, and add them to the cart.
          </p>
          <p>
            The cart is where you can see what courses you have selected. You can remove courses, get more info on them,
            or submit the cart and discover what the selected courses lead to in terms of programs.
          </p>
          <p>
            The program result screen that appears after the cart has been submitted shows what percentage of
            program requirements have been fulfilled based on the courses within the cart.
          </p>
          <p>
            Have fun exploring the various programs and courses provided with this unique tool!
          </p>
        </Popover.Content>
      </Popover>
    );

    return (
      <div className="App">
        <header className="App-header" role="banner">
          <div className="app-title">
            <h1 className="maroon app-title"> {title} </h1>  
          </div>
          <span className="about-icon">
            <OverlayTrigger placement="bottom" overlay={popover}>
              <FontAwesomeIcon 
                  icon={faQuestionCircle}
                  size="lg"
                  tabIndex={0}
                  aria-label="About Button"/>
            </OverlayTrigger>
          </span>
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
