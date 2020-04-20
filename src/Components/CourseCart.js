import '../css/cart.css';
import React, {createRef} from 'react';
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons'

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
                onClick={() => removeCourseFromCart(course.courseID, course.season)}
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
      this.scrollToCart = createRef();
    }



    render() {
        const {selectedCourses,removeCourseFromCart} = this.props;
        return(
            <div className="course-cart-container">
                <h2 ref={this.scrollToCart}> Cart </h2>
              
                <div className="cart">
                  <span className="cart-symbol" onClick={() => {this.scrollToCart.current.scrollIntoView({ behavior: 'smooth' });}}>
                    <FontAwesomeIcon icon={faShoppingCart} size="xs" /><div id="lblCartCount">{selectedCourses.length}</div>
                  </span>
                  {selectedCourses && generateCourseList(selectedCourses,removeCourseFromCart)}
                  <div className="submit-button w-100 px-2">
                    <button className="btn btn-primary" onClick={this.props.submitCourses}>Submit</button>
                  </div>
                </div>
            </div>
        );
    }
  }
  