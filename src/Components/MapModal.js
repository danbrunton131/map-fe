import React from 'react';
import {Modal, Button, Row, Col, Container} from 'react-bootstrap';

export default class ExampleApp extends React.Component {
    constructor (props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
  
  handleCloseModal () {
    this.props.hideModal();
  }
    
    render () {
        const showModal = this.props.showModalState
        return (
            <Modal
                show={showModal} 
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
                        <Col xs={12} md={8}>
                            <div className="description">
                                <h2>Life Sciences - Level 2</h2>
                                <p>A program about life, and science... don't know anything else. Just that it's for losers who don't want to die to the coronavirus. Like come on, who doesn't want to die coughing up blood!</p>
                                <p>Add clickability to expand each entry to show unmet requirements.</p>
                            </div>
                        </Col>
                        <Col xs={12} md={4}><div className="pie-chart">A pie chart</div></Col>
                        </Row>
                    </div>
                    </Container>
                    <Container>
                        <div className="program-result">
                            <Row>
                                <Col xs={12} md={8}>
                                    <div className="description">
                                        <h2>Life Sciences - Level 2</h2>
                                        <p>A program about life, and science... don't know anything else. Just that it's for losers who don't want to die to the coronavirus. Like come on, who doesn't want to die coughing up blood!</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={4}><div className="pie-chart">A pie chart</div></Col>
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