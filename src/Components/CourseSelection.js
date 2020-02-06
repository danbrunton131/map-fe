import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';


const generateCourseList = (allCourses) => {
    return allCourses.map((course, index) => {
      return (
          <React.Fragment>
            <span
                className={"fake-link"}
                key={course.id}
                id={course.id}
                name={course.name}
                onClick={null}
            > 
            {course.code} 
            </span>
            <br/>
        </React.Fragment>
      );
    })
  }


export default class CourseSelection extends React.Component {
    constructor(props) {
      super(props);
      this.state = {color: "red"};
    }
    render() {
        const {allCourses} = this.props;
        return(
            <div className="course-selection">
                <h2> Course Selection </h2>
                <Tabs defaultActiveKey="fall" id="uncontrolled-tab-example">
                    <Tab eventKey="fall" title="Fall">
                    {generateCourseList(allCourses)}
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
  