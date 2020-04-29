import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';
import MapModal from './MapModal';
import SearchBar from './SearchBar';
import LoadingOverlay from '../common/LoadingOverlay';
import {getCurrentTime} from '../common/utilities';

import {submitSelection} from '../api/courses-api';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseSelectionList: this.props.allCourses, // courses fetched from BE
            selectedCourses:[], // courses shown in cart
            programResults:[], // results once student submits
            modalShown: false,
            selectedSeason:"fall", // current season from CourseSelection
            isLoadingResults: false,
          };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addCourseToCart = this.addCourseToCart.bind(this);
        this.addSearchedCourseToCart = this.addSearchedCourseToCart.bind(this);
        this.removeCourseFromCart = this.removeCourseFromCart.bind(this);
        this.onSeasonChange = this.onSeasonChange.bind(this);
        this.submitCourses = this.submitCourses.bind(this);
    }

    submitCourses(){
      const {selectedCourses} = this.state;
      const courseIdList =[];
      // generate array of courseIds from selectedCourses
      for (let i=0;i < selectedCourses.length;i++){
        const courseId = selectedCourses[i].courseID;
        courseIdList.push(courseId);
      }
      this.setState({isLoadingResults: true}, 
        () => submitSelection({selections: courseIdList}).then(res => {
          this.setState({programResults: res.data.matchedPrograms, isLoadingResults: false});
          this.showModal();
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
      );
    }

    //confirm caps situation of class list object indexing
    onSeasonChange(selectedSeason){
        this.setState({selectedSeason});
      }
  
    addSearchedCourseToCart(newCourse) {
      const {selectedCourses} = this.state;

      // If newCourse is not already in Cart, add it to Cart
      const cartIndex = selectedCourses.findIndex(selectedCourse => selectedCourse.courseID === newCourse.courseID);
      if (cartIndex === -1) {
        this.setState({
          selectedCourses: [...selectedCourses, {...newCourse, season: "searched"}],
      });
      // Show an error if newCourse is already in Cart
      } else {
        const error = {message: `${newCourse.courseCode} is already in Cart!`, timeout: 5000, key: getCurrentTime()};
        this.props.showErrorMessage(error);
      }
  }

    addCourseToCart(newCourse){
        const {selectedCourses, courseSelectionList, selectedSeason} = this.state;

      // verify the course isn't already added to cart through another season or through the search bar . 
      const cartIndex = selectedCourses.findIndex(selectedCourse => selectedCourse.courseID === newCourse.courseID);
      if (cartIndex === -1) {
        const newCourseIndex = courseSelectionList[selectedSeason].findIndex(course => course.courseID === newCourse.courseID);
          let updatedCourseSelectionList = courseSelectionList;
          // mark course as selected so it cannot be added to cart twice
          updatedCourseSelectionList[selectedSeason][newCourseIndex].selected = true;
          // track the semester of the course for deletion of courses. (courseSelectionList is organzed by season)
          updatedCourseSelectionList[selectedSeason][newCourseIndex].season = selectedSeason; 

          this.setState({
              selectedCourses: [...selectedCourses, courseSelectionList[selectedSeason][newCourseIndex]],
              courseSelectionList: updatedCourseSelectionList
          });
        } else {
          const error = {message: `${newCourse.courseCode} is already in Cart!`, timeout: 5000, key: getCurrentTime()};
          this.props.showErrorMessage(error);
        }
    }

    removeCourseFromCart(courseId, season){
        const {courseSelectionList, selectedCourses} = this.state;

        // Removing a "Searched" course: its season is "search" and it is not in the courseSelectionList (preselected ones)
        // We simply remove it from the cart.
        if (season === "searched") {
          const updatedSelectedCourses = selectedCourses.filter(function( course ) {
            return course.courseID !== courseId;
        });
        this.setState({
          selectedCourses: updatedSelectedCourses,
      });

      // Remove a course added from Course Selection
      // Update courseSelectionList to remove "in cart" status of the course 
      } else {
          const courseIndex = courseSelectionList[season].findIndex(course => course.courseID === courseId);
          // deselect course when removing it from cart
          let updatedCourseSelectionList = courseSelectionList;
          updatedCourseSelectionList[season][courseIndex].selected = false;

          const updatedSelectedCourses = selectedCourses.filter(function( course ) {
              return course.courseID !== courseId;
          });
            
          this.setState({
              selectedCourses: updatedSelectedCourses,
              courseSelectionList: updatedCourseSelectionList
          });
      }
    }

    showModal() {
        this.setState({ modalShown: true});
    }

    hideModal() {
        this.setState({ modalShown: false});
    }

    render() {
        const {courseSelectionList, selectedCourses, programResults} = this.state;

        return(
            <div className="container-fluid">
              <Row>
                <Col sm={12} md={9}>
                  <section aria-label="Search Bar"/>
                  <SearchBar addCourseToCart={this.addSearchedCourseToCart}/>
                </Col>
              </Row>
              <Row>
                  <Col sm={12} md={9}>
                      <section aria-label="Course Selection"/>
                      <CourseSelection courseSelectionList={courseSelectionList} addCourseToCart={this.addCourseToCart} onSeasonChange={this.onSeasonChange}/> 
                  </Col>

                  <Col sm={12} md={3}>
                      <section aria-label="Cart"/>
                      <CourseCart submitCourses={this.submitCourses} selectedCourses={selectedCourses} removeCourseFromCart={this.removeCourseFromCart}/>
                  </Col>
              </Row>

              {this.state.modalShown &&
                <MapModal hideModal={this.hideModal} programResults={programResults}></MapModal>
              }
              {this.state.isLoadingResults && <LoadingOverlay role="alert" aria-label="Your program results are loading"/>}
            </div>
      );
    }
  }
  