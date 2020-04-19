import '../css/search.css';
import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

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
      return(
        <React.Fragment>
            <h2> Search </h2>
            <InputGroup size="md" className="mb-3">
                <FormControl type="text" className="search-input" placeholder="SEARCH FOR A COURSE..." aria-label="Search for a course"/>
                <InputGroup.Append>
                    <button className="btn btn-secondary btn-search"></button>
                </InputGroup.Append>
            </InputGroup>
    </React.Fragment>
);
    }
  }