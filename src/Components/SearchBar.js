import '../css/search.css';
import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import {searchForCourse} from '../api/courses-api';


export default class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: 'false',
      };
      this.submitSearch = this.submitSearch.bind(this);
    }

    submitSearch() {
      searchForCourse({searchTerm: "MATH"}).then(res => {
        console.log(res)
      // this.setState({allCourses});
      // console.log(allCourses);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
    });

    }

    toggleOpen(isOpen) {
      this.setState({isOpen:!isOpen});
    }

    render() {
      return(
        <React.Fragment>
            <h2> Search </h2>
            <InputGroup size="md" className="mb-3">
                <FormControl type="text" className="search-input" placeholder="SEARCH FOR A COURSE..." aria-labelledby="Search for a course"/>
                <InputGroup.Append>
                    <button className="btn btn-secondary btn-search" onClick={this.submitSearch}></button>
                </InputGroup.Append>
            </InputGroup>
    </React.Fragment>
);
    }
  }