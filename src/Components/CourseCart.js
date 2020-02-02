import '../css/cart.css';
import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';


export default class CourseCart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {color: "red"};
    }
    render() {
        return(
            <div className="course-cart-container">
                <h2> Cart </h2>
                <div className="cart"/>
            </div>
        );
    }
  }
  