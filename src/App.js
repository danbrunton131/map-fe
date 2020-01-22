import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
	constructor (props) {
		super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      showModal: false
    };
	}

  handleOpenModal() {
    this.setState({showModal: true});
  }
  handleCloseModal() {
    this.setState({showModal: false});
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <body>

          <Button className="btn btn-primary" onClick={this.handleOpenModal}>
            Modal
          </Button>

        </body>

        {/*Might need to break this out into it's own component*/}
        <Modal show={this.state.showModal} dialogClassName={"primary-modal"} size="lg" onHide={this.handleCloseModal}>
          <Modal.Header id="modal-header" closeButton>
            <Modal.Title id="modal-title">Results</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal-body">
            {/* Modal Program Result Component */}
            <Container>
              <div class="program-result">
                <Row>
                  <Col xs={12} md={8}>
                    <div class="description">
                      <h2>Life Sciences - Level 2</h2>
                      <p>A program about life, and science... don't know anything else. Just that it's for losers who don't want to die to the coronavirus. Like come on, who doesn't want to die coughing up blood!</p>
                      <p>Add clickability to expand each entry to show unmet requirements.</p>
                    </div>
                  </Col>
                  <Col xs={12} md={4}><div class="pie-chart">A pie chart</div></Col>
                </Row>
              </div>
            </Container>
            <Container>
              <div class="program-result">
                <Row>
                  <Col xs={12} md={8}>
                    <div class="description">
                      <h2>Life Sciences - Level 2</h2>
                      <p>A program about life, and science... don't know anything else. Just that it's for losers who don't want to die to the coronavirus. Like come on, who doesn't want to die coughing up blood!</p>
                    </div>
                  </Col>
                  <Col xs={12} md={4}><div class="pie-chart">A pie chart</div></Col>
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
      </div>
    );
  }

}

export default App;
