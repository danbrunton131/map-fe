import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';
import MapModal from './MapModal';

export default class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: "red",
        showModalState: false
        };
    }

    showModal = () => { this.setState({ showModalState: true }); };

    hideModal = () => { this.setState({ showModalState: false }); };

    render() {
        return(
            <div className="container-fluid">
            <Row>
                <Col sm={12} md={9}>
                    <CourseSelection> </CourseSelection>
                </Col>

                <Col sm={12} md={3}>
                    {/* <div className="sample-fill"/> */}
                    <CourseCart showModal={this.showModal} hideModal={this.hideModal}> </CourseCart>
                </Col>
            </Row>

            <MapModal showModalState={this.state.showModalState} showModal={this.showModal} hideModal={this.hideModal}> </MapModal>

            </div>
      );
    }
  }
  