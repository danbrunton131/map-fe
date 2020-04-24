import '../css/course-selection.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPlusCircle, faShoppingCart, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import SmoothCollapse from 'react-smooth-collapse';

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
      const {course, addCourseToCart, removeCourseFromCart} = this.props;
      const {isOpen} = this.state;
      
      return(
        <div className="course-item" aria-label={`${course.courseCode}`}>
        <text> {course.errorMessage} </text>
          {/* Course Code */}
          <span
              className="course-code"
              tabIndex={0}
              id={course.courseID}
              name={course.courseCode}
              aria-label={course.courseCode}
              onKeyPress={(e) => e.key === "Enter" && this.toggleOpen()}
              onClick={() => this.toggleOpen()}
          >
          {course.courseCode} 
          </span>

          {/* Course Action Icons, determined by CourseSelection View (addCourseToCart) or CourseCart View (removeCourseFromCart) */}
          <div className="course-actions float-right"> {/* ensures DOM ordering  of icons is preserved for tabbability */}

          {/* Course Selection View Actions */}
          {addCourseToCart && 
            <React.Fragment>
              {course.selected &&
                <div
                    tabIndex={0}
                    className="course-action in-cart float-left mr-3"
                    id={course.courseID}
                    name={course.courseCode}
                    aria-label={`${course.courseCode} is in your cart`}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} size="1x" />
                  </div>
              }

              {/*Add to Cart Icon*/}
              <div
                tabIndex={0}
                className="course-action float-left mr-3"
                id={course.courseID}
                name={course.courseCode}
                onClick={() => addCourseToCart(course)}
                onKeyPress={(e) => e.key === "Enter" && addCourseToCart(course.courseID)}
                aria-label={`Add ${course.courseCode} to cart`}
              >
                <FontAwesomeIcon icon={faPlusCircle} size="1x" />
              </div>

              {/* Course Description Toggle */}
              <div
                  tabIndex={0}
                  className="course-action float-left mr-3"
                  onKeyPress={(e) => e.key === "Enter" && this.toggleOpen()}
                  onClick={() => this.toggleOpen()}
                  aria-label={isOpen ? `Minimize ${course.courseCode} Information` : `Maximize ${course.courseCode} Information`}
              >
                <FontAwesomeIcon icon={isOpen ? faAngleUp: faAngleDown } size="1x"/>
              </div>
            </React.Fragment>
          }

          {/* CourseCart View Actions */}
          {removeCourseFromCart &&
            <div
              tabIndex={0}
              className="course-action float-left mr-3"
              id={course.courseID}
              name={course.courseCode}
              onClick={() => removeCourseFromCart(course.courseID, course.season)}
              onKeyPress={(e) => e.key === "Enter" && removeCourseFromCart(course.courseID, course.season)}
              aria-label={`Remove ${course.courseCode} from cart`}
            >
              <FontAwesomeIcon icon={faMinusCircle} size="1x" />
            </div>
          }
          </div>

          {/* Course Description */}
          <SmoothCollapse expanded={isOpen} className="course-description">
            <p tabIndex={0}>
            <strong>{course.courseName} </strong>
            {course.courseDesc}
            </p>
          </SmoothCollapse>

        </div>
      );
    }
  }