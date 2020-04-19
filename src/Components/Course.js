import '../css/course-selection.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faInfoCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default class Course extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };
      this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
      const {isOpen} = this.state;
      this.setState({isOpen:!isOpen});
    }

    render() {
      const {course, addCourseToCart} = this.props;
      const {isOpen} = this.state;

      return(
        <Col sm={12} md={6} className={"course-item"} aria-label="Course">

          {/* Course Code */}
          <span
              tabIndex={0}
              // className={"fake-link"}
              id={course.courseID}
              name={course.name}
              // onClick={!course.selected ? () => addCourseToCart(course.courseID) : null}
              // onKeyPress={!course.selected ? (e) => e.key === "Enter" && addCourseToCart(course.courseID) : null}
              aria-label={course.name}
          >
          {course.courseCode} 
          </span>

          {/* Course Action Icons for Description and AddToCart*/}
          <div className="course-actions float-right"> {/* ensures DOM ordering  of icons is preserved for tabbability */}
            <div
                tabIndex={0}
                className="course-action float-left mr-3"
                id={course.courseID}
                name={course.name}
                onClick={!course.selected ? () => addCourseToCart(course.courseID) : null}
                onKeyPress={!course.selected ? (e) => e.key === "Enter" && addCourseToCart(course.courseID) : null}
                aria-label="Add course to cart"
            >
              <FontAwesomeIcon icon={faPlusCircle} size="xs" />
            </div>

            {/* Course Description Toggle */}
            <div
                tabIndex={0}
                className="course-action float-left mr-3"
                onKeyPress={(e) => e.key === "Enter" && this.toggleOpen()}
                onClick={() => this.toggleOpen()}
                aria-label={isOpen ? "Minimize Course Information" : "Maximize Course Information"}
            >
              <FontAwesomeIcon icon={isOpen ? faAngleUp: faAngleDown } size="xs" />
            </div>
          </div>

          {/* Course Description */}
          {
            isOpen && 
            <React.Fragment>
            <p className="course-description" tabIndex={0}>
            <strong>Course Title </strong>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            </React.Fragment>
          }    
        </Col>
      );
    }
  }