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
    }
    addCourseToCart(courseId){
        const {selectedCourses, allCourses} = this.state;
        const newCourse = allCourses.find(course => course.id === courseId);

        console.log(courseId);
        this.setState(
            {selectedCourses: {...selectedCourses, newCourse}
        });
    }

    render() {
        const {allCourses} = this.state;
        return(
            <div className="container-fluid">
            <Row>
                <Col sm={12} md={9}>
                    <CourseSelection allCourses={allCourses} addCourseToCart={this.addCourseToCart} /> 
                </Col>

                <Col sm={12} md={3}>
                    {/* <div className="sample-fill"/> */}
                    <CourseCart> </CourseCart>
                </Col>
            </Row> 
            </div>
      );
    }
  }
  