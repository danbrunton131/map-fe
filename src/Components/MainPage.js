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
            <React.Fragment>
                <CourseCart> </CourseCart>
                <CourseSelection> </CourseSelection>
            </React.Fragment>
      );
    }
  }
  