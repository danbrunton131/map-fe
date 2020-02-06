import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';

export default class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          allCourses:[
            {id:0, code:'LIFESCI 1D03', name:'Medical Imaging Physics'},
            {id:1, code:'CHEM 1A03', name:'Introductory Chemistry I'},
        ],
          selectedCourses:[],

      };
      this.addCourseToCart = this.addCourseToCart.bind(this);
      this.removeCourseFromCart = this.removeCourseFromCart.bind(this);
    }
    addCourseToCart(courseId){
        const {selectedCourses, allCourses} = this.state;
        const newCourse = allCourses.find(course => course.id === courseId);
       
        this.setState(
            {selectedCourses: [...selectedCourses, newCourse]
        });
    }

    removeCourseFromCart(courseId){
        const {selectedCourses} = this.state;
        const updatedCourseList = selectedCourses.filter(function( course ) {
            return course.id !== courseId;
        });
          
        this.setState({selectedCourses: updatedCourseList});
    }

    render() {
        const {allCourses, selectedCourses} = this.state;
        return(
            <div className="container-fluid">
            <Row>
                <Col sm={12} md={9}>
                    <CourseSelection allCourses={allCourses} addCourseToCart={this.addCourseToCart} /> 
                </Col>

                <Col sm={12} md={3}>
                    {/* <div className="sample-fill"/> */}
                    <CourseCart selectedCourses={selectedCourses} removeCourseFromCart={this.removeCourseFromCart}/>
                </Col>
            </Row> 
            </div>
      );
    }
  }
  