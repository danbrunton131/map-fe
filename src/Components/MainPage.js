import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';

export default class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {color: "red"};
    }
    render() {
        return(
            <Row>
                <Col sm={12} md={3}>
                    <h1>Col1</h1>
                    <div className="sample-fill"/>
                    {/* <CourseCart> </CourseCart> */}
                </Col>
                <Col sm={12} md={9}>
                    <h1>Col2</h1>
                    <div className="sample-fill"/>
                    {/* <CourseSelection> </CourseSelection> */}
                </Col>
            </Row>
      );
    }
  }
  