import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
          <Modal.Header closeButton>
            <Modal.Title id="modal-title">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal-body"><p>Woohoo, you're reading this text in a modal!</p></Modal.Body>
          <Modal.Footer id="modal-footer">
            <Button variant="btn btn-info" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="btn btn-primary" onClick={this.handleCloseModal}>
              Save Changes (float this left)
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default App;
