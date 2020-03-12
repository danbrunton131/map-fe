import '../css/cart.css';
import React from 'react';
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

const generateCourse = (course, index) => {
  return (
    <React.Fragment>
      {/*add onClick to display information about the course*/}
      <span
          className={"course-text align-middle"}
          id={course.courseID}
          name={course.name}
      > 
      {course.courseCode} 
      </span>
      <br/>
    </React.Fragment>
  );
}

const generateCourseList = (selectedCourses, removeCourseFromCart) => {
    return selectedCourses.map((course, index) => {
      return (
          <React.Fragment key={course.courseID}>
            <div className={"course-link fake-link"}>
              {generateCourse(course, index)}
              {/*TODO make this button accessible*/}
              <div 
                tabIndex={0}
                className="cart-minus align-middle align-center"
                onKeyPress={(e) => e.key === "Enter" && removeCourseFromCart(course.courseID)}
                onClick={() => removeCourseFromCart(course.courseID)}
              >
                <FontAwesomeIcon icon={faMinus} size="xs" />
              </div>
            </div>
        </React.Fragment>
      );
    })
  }


export default class CourseCart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {color: "red"};
    }



    render() {
        const {selectedCourses,removeCourseFromCart} = this.props;
        return(
            <div className="course-cart-container">

                <h2> Cart </h2>
                
                <div className="cart">
                  <span className="cart-content-number text-center"><span className="align-middle">{selectedCourses.length}</span></span>
                  {selectedCourses && generateCourseList(selectedCourses,removeCourseFromCart)}

                  <div className="submit-button w-100 px-2">
                    <button className="btn btn-primary" onClick={this.props.submitCourses}>Submit</button>
                  </div>
                </div>
            </div>
        );
    }
  }
  