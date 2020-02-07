import '../css/cart.css';
import React from 'react';
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';


export default class CourseCart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {color: "red"};
    }



    render() {
        return(
            <div className="course-cart-container">
                <h2> Cart </h2>
                <div className="cart">
                  <div></div>
                  <div className="submit-button w-100 px-2">
                    <Button className="btn btn-primary" onClick={this.props.showResults}>Submit</Button>
                  </div>
                </div>
            </div>
        );
    }
  }
  