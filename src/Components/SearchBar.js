import '../css/search.css';
import React from 'react';
import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: 'false',
      };
    }

    toggleOpen(isOpen) {
      this.setState({isOpen:!isOpen});
    }

    render() {
      const {course, addCourseToCart} = this.props;
      const {isOpen} = this.state;

      return(
        <InputGroup size="md" className="mb-3">
            <FormControl type="text" className="search-input" placeholder="SEARCH FOR A COURSE..." aria-label="Search for a course"/>
            <InputGroup.Append>
                <button className="btn btn-secondary btn-search"></button>
            </InputGroup.Append>
    </InputGroup>
);
    }
  }