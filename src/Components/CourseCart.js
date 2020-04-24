import '../css/cart.css';
import React, {createRef} from 'react';
import Course from './Course';
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const generateCourseList = (selectedCourses, removeCourseFromCart) => {
  return selectedCourses.map((course, index) => {
    return ( <Course key={course.courseID} course={course} removeCourseFromCart={removeCourseFromCart} /> );
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
            <div className="course-cart">
                <div className="cart-header">
                  <h2 ref={this.scrollToCart}> Cart </h2>
                    <span className="cart-symbol" onClick={() => {this.scrollToCart.current.scrollIntoView({ behavior: 'smooth' });}} tabIndex={0} aria-label={`There are ${selectedCourses.length} courses in your cart`}>
                        <FontAwesomeIcon icon={faShoppingCart} size="xs"/><div className="disable-select" id="lblCartCount">{selectedCourses.length}</div>
                    </span>
                </div>

                <div className="cart">
                  <div className="course-container">
                    { selectedCourses && 
                          selectedCourses.length > 0 ?
                              generateCourseList(selectedCourses, removeCourseFromCart) 
                            : <div> Add a course from Course Selection for it to appear here.</div>
                        }
                  </div>        
                  <div className="cart-footer px-2">
                      <button className="btn btn-primary" onClick={this.props.submitCourses} aria-label="View program results based on courses added to your cart">Submit</button>
                  </div>  

                </div>

            </div>
        );
        
    }
  }
  