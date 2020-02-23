import '../css/course-selection.css';
import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';

const generateCourseList = (allCourses, addCourseToCart) => {
    console.log(allCourses);
    return allCourses.map((course, index) => {
      return (
          <React.Fragment>
            <span
                className={"fake-link"}
                key={course.courseID}
                id={course.courseID}
                name={course.name}
                onClick={!course.selected ? () => addCourseToCart(course.courseID) : null}
            > 
            {course.courseCode} 
            </span>
            <br/>
        </React.Fragment>
      );
    })
  }

  export default class CourseSelection extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        allCourses:[],
      };
    }    

    render() {
      const {allCourses, addCourseToCart} = this.props;
      // const {allCourses} = this.state;
      console.log(allCourses);
      console.log(this.props);
        return(
            <div className="course-selection">
                <h2> Course Selection </h2>
                <Tabs defaultActiveKey="fall" id="uncontrolled-tab-example">
                    <Tab eventKey="fall" title="Fall">
                    {generateCourseList(allCourses, addCourseToCart)}
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </Tab>
                    <Tab eventKey="winter" title="Winter">
                    </Tab>
                    <Tab eventKey="spring-summer" title="Spring/Summer">
                    </Tab>
                </Tabs> 
            </div>
        );
    }
  }
  