import React from 'react';
import {Modal, Button, Row, Col, Container} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';

export default class ExampleApp extends React.Component {
    constructor (props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.chartRef1 = React.createRef();
        this.chartRef2 = React.createRef();

        this.chartData = {
            labels: [
                'Satisfied',
                'Unsatisfied'
            ],
            datasets: [{
                data: [300, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
    }
  
    handleCloseModal () {
        this.props.hideModal();
    }
    
    render () {
        return (
            <Modal
                show={true} 
                dialogClassName={"primary-modal"} 
                size="lg" 
                onHide={this.handleCloseModal}
            >
                <Modal.Header id="modal-header" closeButton>
                    <Modal.Title id="modal-title">Results</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body">
                    {/* Modal Program Result Component */}
                    <Container>
                        <div className="program-result">
                            <Row>
                            <Col sm={12} md={8}>
                                <div className="description">
                                    <h2>Life Sciences - Level 2</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <p>Add clickability to expand each entry to show unmet requirements.</p>
                                </div>
                            </Col>
                            <Col sm={12} md={4}>
                                <Pie ref={this.chartRef1} data={this.chartData} width="100" height="100" />
                            </Col>
                            </Row>
                        </div>
                    </Container>
                    <Container>
                        <div className="program-result">
                            <Row>
                                <Col sm={12} md={8}>
                                    <div className="description">
                                        <h2>Life Sciences - Level 2</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </div>
                                </Col>
                                <Col sm={12} md={4}>
                                    <Pie ref={this.chartRef2} data={this.chartData} width="100" height="100" />
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer id="modal-footer">
                    <Button variant="btn btn-primary" onClick={this.handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}