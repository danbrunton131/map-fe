import '../css/course-selection.css';
import React from 'react';
import {Alert} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class ErrorMessage extends React.Component {
    constructor(props) {
      super(props);
      console.log('hit!');
      this.state = {
          shown: true,
      };
      this.setTimeout = this.setTimeout.bind(this);
      this.closeError = this.closeError.bind(this);
    }

    componentDidMount(){
        if (this.props.timeout){
            this.setTimeout();
        }
    }

    //disable alert once time runs out	
    setTimeout() {
        const {timeout} = this.props;

        window.setTimeout(()=>{	
            this.closeError();
        }, timeout);	
    }	   

    closeError(){
        this.setState({shown: false});
    }  
  

    render() {
        const {message} = this.props; 
        const {shown} = this.state;
        console.log(this.props.timeout);
      return(
        <Alert 
            className="sticky-message map-alert" 
            role="alert" 
            show={shown} 
            variant="warning" 
            onClose={this.closeError} 
            dismissible 
            transition={null}
      >
        <Alert.Heading className="alert-heading">{message}</Alert.Heading>
      </Alert>
        );
    }
  }

  ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    timeout: PropTypes.number, // timeout is in milliseconds
  }
  
  ErrorMessage.defaultProps = {
    timeout: 5000, // 5000 ms default timeout
  };
  