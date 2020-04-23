import '../css/search.css';
import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import {searchForCourse} from '../api/courses-api';
import Course from './Course';

const generateSearchResults = (selectedCourses, addCourseToCart) => {
  return selectedCourses.map((course, index) => {
    return ( <Course key={`search-${course.courseID}`} course={course} addCourseToCart={addCourseToCart}/> );
  })
}


export default class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
        results: [],
        message: '',
        searching: false,
      };
      this.submitSearch = this.submitSearch.bind(this);
      this.updateSearchForm = this.updateSearchForm.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() { document.addEventListener("click", this.handleClickOutside, false); }
    componentWillUnmount() { document.removeEventListener("click", this.handleClickOutside, false); }
    
    submitSearch() {
      const {searchTerm} = this.state;

      this.setState({searching: true}, 
        () => searchForCourse({searchTerm}).then(res => {
          console.log(res);
          if (res.data.error && res.data.error === "long query"){
            this.setState({message: "Your request was too long", results: []});
          } else if (res.data.results && res.data.results.length === 0){
            this.setState({message: "No results found", results: []});
          } else {
            this.setState({results: res.data.results , message:""});
          }
        }).catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
      );
  }

    updateSearchForm(e) {
      this.setState(
        { searchTerm: e.target.value}, 
        this.submitSearch() // Live Searching - submit after updating search term
      ); 
    }

    handleClickOutside(e){
      if (this.searchBox.contains(e.target)) {
        return;
      }
      this.setState({results: [], message: "", searching: false});
    }

    // Allow user to submit search via the enter button
    enterToSubmit(e){
      if(e.key === "Enter"){
          this.submitSearch(); 
      }
      return false;
    }

    render() {
      const {searchTerm, results, message, searching} = this.state;
      return(
        <div className="search-bar">
            <h2> Search </h2>
            <InputGroup size="md" className="mb-3" ref={searchBox => { this.searchBox = searchBox; }}>
                <FormControl
                 type="text"
                 className="search-input"
                 placeholder="SEARCH FOR A COURSE..." 
                 defaultValue={searchTerm} 
                 onChange={this.updateSearchForm}
                 aria-labelledby="Search for a course"
                 onKeyPress={this.enterToSubmit.bind(this)}
                />
                <InputGroup.Append>
                    <button className="btn btn-secondary btn-search" onClick={this.submitSearch}></button>
                </InputGroup.Append>
                { searching && 
                  <div className="search-results-container">
                    <div className="search-results">
                    {results.length > 0 ? generateSearchResults(results, this.props.addCourseToCart) : message}
                    </div>
                  </div>
                } 

            </InputGroup>
      </div>
);
    }
  }