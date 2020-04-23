import '../css/search.css';
import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import {searchForCourse} from '../api/courses-api';
import Course from './Course';

const generateSearchResults = (selectedCourses, addCourseToCart) => {
  return selectedCourses.map((course, index) => {
    return ( <Course key={course.courseID} course={course} addCourseToCart={addCourseToCart}/> );
  })
}


export default class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
        results: [],
      };
      this.submitSearch = this.submitSearch.bind(this);
      this.updateSearchForm = this.updateSearchForm.bind(this);
    }

    submitSearch() {
      const {searchTerm} = this.state;
      searchForCourse({searchTerm}).then(res => {
        console.log(res)
      this.setState({results: res.data.results});
      // console.log(allCourses);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
    });
  }

    updateSearchForm(e) {
      console.log(e.target.value);
      this.setState({searchTerm: e.target.value});
    }


    render() {
      const {searchTerm, results} = this.state;
      return(
        <React.Fragment>
            <h2> Search </h2>
            <InputGroup size="md" className="mb-3">
                <FormControl
                 type="text"
                 className="search-input"
                 placeholder="SEARCH FOR A COURSE..." 
                 defaultValue={searchTerm} 
                 onChange={this.updateSearchForm}
                 aria-labelledby="Search for a course"
                />
                <InputGroup.Append>
                    <button className="btn btn-secondary btn-search" onClick={this.submitSearch}></button>
                </InputGroup.Append>
                {
                  results.length > 0 && 
                    <div className="search-results-container">
                    <div className="search-results">
                      {generateSearchResults(results, this.props.addCourseToCart)}
                  </div> </div>
                }

            </InputGroup>
    </React.Fragment>
);
    }
  }