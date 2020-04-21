import '../css/course-selection.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faInfoCircle, faPlusCircle, faShoppingCart, faMinus} from '@fortawesome/free-solid-svg-icons';
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
      console.log(removeCourseFromCart);

      return(
        <div className="course-item" aria-label="Course">
          {/* Course Code */}
          <span
              tabIndex={0}
              id={course.courseID}
              name={course.name}
              aria-label={course.name}
          >
          {course.courseCode} 
          </span>

          {/* Course Action Icons, separated by CourseSelection and CourseCart Views by the addCourseToCart/removeCourseFromCart functions */}
          <div className="course-actions float-right"> {/* ensures DOM ordering  of icons is preserved for tabbability */}

          {/* Course in Selection Actions */}
          {addCourseToCart && 
            <React.Fragment>
              {course.selected &&
                <div
                    tabIndex={0}
                    className="course-action in-cart float-left mr-3"
                    id={course.courseID}
                    name={course.name}
                    aria-label={`${course.name} is in your cart`}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} size="1x" />
                  </div>
              }

              {/*Add to Cart Icon*/}
              <div
                tabIndex={0}
                className="course-action float-left mr-3"
                id={course.courseID}
                name={course.name}
                onClick={!course.selected ? () => addCourseToCart(course.courseID) : null}
                onKeyPress={!course.selected ? (e) => e.key === "Enter" && addCourseToCart(course.courseID) : null}
                aria-label={`Add ${course.name} to cart`}
              >
                <FontAwesomeIcon icon={faPlusCircle} size="1x" />
              </div>

              {/* Course Description Toggle */}
              <div
                  tabIndex={0}
                  className="course-action float-left mr-3"
                  onKeyPress={(e) => e.key === "Enter" && this.toggleOpen()}
                  onClick={() => this.toggleOpen()}
                  aria-label={isOpen ? `Minimize ${course.name} Information` : `Maximize ${course.name} Information`}
              >
                <FontAwesomeIcon icon={isOpen ? faAngleUp: faAngleDown } size="1x"/>
              </div>

              {/* Course Description */}
              <SmoothCollapse expanded={isOpen} className="course-description">
                <p tabIndex={0}>
                <strong>Course Title </strong>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </SmoothCollapse>
            </React.Fragment>
          }

          {/* Course in Cart Actions */}
          {removeCourseFromCart &&
            <div
              tabIndex={0}
              className="course-action float-left mr-3"
              id={course.courseID}
              name={course.name}
              onClick={() => removeCourseFromCart(course.courseID, course.season)}
              onKeyPress={(e) => e.key === "Enter" && removeCourseFromCart(course.courseID, course.season)}
              aria-label={`Remove ${course.name} from cart`}
            >
              <FontAwesomeIcon icon={faMinus} size="1x" />
            </div>
          }
          </div>
        </div>
      );
    }
  }