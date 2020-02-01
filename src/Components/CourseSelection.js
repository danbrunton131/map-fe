import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';

export default class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {color: "red"};
    }
    render() {
        return(
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                </Tab>
                <Tab eventKey="contact" title="Contact">
                </Tab>
            </Tabs>      );
    }
  }
  