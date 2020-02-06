import '../css/cart.css';
import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';

const generateCourseList = (allCourses, removeCourseFromCart) => {
    return allCourses.map((course, index) => {
      return (
          <React.Fragment>
            <span
                className={"fake-link"}
                key={course.id}
                id={course.id}
                name={course.name}
                onClick={() => removeCourseFromCart(course.id)}
            > 
            {course.code} 
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
        const {removeCourseFromCart} = this.props;
        return(
            <div className="course-cart-container">
                <h2> Cart </h2>
                <div className="cart"/>
            </div>
        );
    }
  }
  