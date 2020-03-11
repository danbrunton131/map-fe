import '../css/cart.css';
import React from 'react';
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';

const generateCourseList = (selectedCourses, removeCourseFromCart) => {
    return selectedCourses.map((course, index) => {
      return (
          <React.Fragment>
            <span
                tabIndex={0}
                className={"fake-link"}
                key={course.courseID}
                id={course.courseID}
                name={course.name}
                onClick={() => removeCourseFromCart(course.courseID)}
                onKeyPress={(e) => e.key === "Enter" && removeCourseFromCart(course.courseID)}
            > 
            {course.courseCode} 
            </span>
            <br/>
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
  