import '../css/cart.css';
import React from 'react';
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';

const generateCourseList = (selectedCourses, removeCourseFromCart) => {
    return selectedCourses.map((course, index) => {
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
        const {selectedCourses,removeCourseFromCart} = this.props;
        return(
            <div className="course-cart-container">
                <h2> Cart </h2>
                <div className="cart">
                  {selectedCourses && generateCourseList(selectedCourses,removeCourseFromCart)}

                  <div className="submit-button w-100 px-2">
                    <Button className="btn btn-primary" onClick={this.props.showResults}>Submit</Button>
                  </div>
                </div>
            </div>
        );
    }
  }
  