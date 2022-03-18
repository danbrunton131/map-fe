import '../css/cart.css';
import React, {createRef} from 'react';
import PropTypes from 'prop-types';
import Course from './Course';
import {FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const generateCourseList = (selectedCourses, removeCourseFromCart) => {
  return selectedCourses.map((course, index) => {
    return ( <Course key={course.courseID} course={course} removeCourseFromCart={removeCourseFromCart} /> );
  })
}

export default class CourseCart extends React.Component {
    constructor(props) {
      super(props);
      this.state= {
        isCartValid: null,
      }
      this.scrollToCart = createRef();
      this.onSubmitCourses = this.onSubmitCourses.bind(this);
    }

    onSubmitCourses(){
      const {selectedCourses} = this.props;
      const isCartValid = selectedCourses.length > 0 && selectedCourses.length < 16;
      if (isCartValid){
        this.setState({isCartValid: true}, 
          this.props.submitCourses()
        );
      } else {
        this.setState({isCartValid: false});
      }    
    }

    render() {
        const {selectedCourses,removeCourseFromCart} = this.props;
        const {isCartValid} = this.state;

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
                            : <p>Add a course from Course Selection for it to appear here.</p>
                        }
                  </div>        
                  <div className="cart-footer px-2">
                      <button className="btn btn-primary" onClick={this.onSubmitCourses} aria-label="View program results based on courses added to your cart">Submit</button>
                  </div>  
                </div>
                { isCartValid === false && <FormControl.Feedback type="invalid" role="alert">You must add between 0 and 16 courses to your cart. </FormControl.Feedback> }
            </div>
        );
        
    }
  }
  
CourseCart.propTypes = {
    selectedCourses: PropTypes.array.isRequired,
    submitCourses: PropTypes.func.isRequired,
    removeCourseFromCart: PropTypes.func.isRequired,
}