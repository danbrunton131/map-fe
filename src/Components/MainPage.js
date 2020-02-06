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
    }
    render() {
        const {allCourses} = this.state;
        return(
            <div className="container-fluid">
            <Row>
                <Col sm={12} md={9}>
                    <CourseSelection allCourses={allCourses}/> 
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
  