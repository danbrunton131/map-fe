import '../css/course-selection.css';
import React from 'react';
import {Alert} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class ErrorMessage extends React.Component {
    _isMounted = false; /* used to prevent state changes on unmounted ErrorMessages */

    constructor(props) {
      super(props);
      this.state = {
          shown: true,
      };
      this.setTimeout = this.setTimeout.bind(this);
      this.closeError = this.closeError.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;

        if (this.props.timeout){
            this.setTimeout();
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    //disable alert once time runs out	
    setTimeout() {
        const {timeout} = this.props;

        window.setTimeout(()=>{	
            this.closeError()
        }, timeout);	
    }	   

    closeError(){
        if (this._isMounted){
            this.setState({shown: false});
        }
    }  
  

    render() {
        const {message} = this.props; 
        const {shown} = this.state;
        return(
            <Alert 
                className="sticky-message map-alert" 
                role="alert" 
                variant="warning" 
                show={shown}
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
    timeout: 5000, // 5 seconds is the default timeout
  };
  