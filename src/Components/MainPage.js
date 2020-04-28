import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';
import MapModal from './MapModal';
import SearchBar from './SearchBar';
import LoadingOverlay from '../common/LoadingOverlay';
import ErrorMessage from '../common/ErrorMessage';

import {fetchAllCourses, submitSelection} from '../api/courses-api';

// time is used as a key to handle subsequent "identical" messages
const getCurrentTime = () =>{
  return(new Date());
}

export const getTermCourseList = (termCoursesByProgram) => {
  let allTermCourses = [];
  for (let classType in termCoursesByProgram){ 
    const classTypeList = termCoursesByProgram[classType];
    for (let i=0; i<classTypeList.length;i++){ //i is the course itself
      allTermCourses.push({...classTypeList[i], key:classTypeList[i].courseID});
    }
  }
  return allTermCourses;
}

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCourses:{}, // courses fetched from BE
            selectedCourses:[], // courses shown in cart
            programResults:[], // results once student submits
            modalShown: false,
            selectedSeason:"fall", // current season from CourseSelection
            error: null,
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

    //add springSummer once BE accounts for the same group
    componentDidMount(){
        fetchAllCourses().then(res => {
          const allCourses = {
            fall: getTermCourseList(res.data.courseLists.Fall), 
            winter: getTermCourseList(res.data.courseLists.Winter),
            spring: getTermCourseList(res.data.courseLists.Spring),
            summer: getTermCourseList(res.data.courseLists.Summer),
          };
          this.setState({allCourses});
        //   console.log(allCourses);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
      });
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
        this.setState({error});
    }
  }

    addCourseToCart(newCourse){
        const {selectedCourses, allCourses, selectedSeason} = this.state;

      // verify the course isn't already added to cart through another season or through the search bar . 
      const cartIndex = selectedCourses.findIndex(selectedCourse => selectedCourse.courseID === newCourse.courseID);
      if (cartIndex === -1) {
        const newCourseIndex = allCourses[selectedSeason].findIndex(course => course.courseID === newCourse.courseID);
          let updatedAllCourses = allCourses;
          // mark course as selected so it cannot be added to cart twice
          updatedAllCourses[selectedSeason][newCourseIndex].selected = true;
          // track the semester of the course for deletion of courses. (allCourses is organzed by season)
          updatedAllCourses[selectedSeason][newCourseIndex].season = selectedSeason; 

          this.setState({
              selectedCourses: [...selectedCourses, allCourses[selectedSeason][newCourseIndex]],
              allCourses: updatedAllCourses
          });
        } else {
          const error = {message: `${newCourse.courseCode} is already in Cart!`, timeout: 5000, key: getCurrentTime()};
          this.setState({error});
        }
    }

    removeCourseFromCart(courseId, season){
        const {allCourses, selectedCourses} = this.state;

        // Removing a "Searched" course: its season is "search" and it is not in the AllCourses list (preselected ones)
        // We simply remove it from the cart.
        if (season === "searched") {
          const updatedSelectedCourses = selectedCourses.filter(function( course ) {
            return course.courseID !== courseId;
        });
        this.setState({
          selectedCourses: updatedSelectedCourses,
      });

      // Remove a course added from Course Selection
      // Update allCourses to remove "in cart" status of the course 
      } else {
          const courseIndex = allCourses[season].findIndex(course => course.courseID === courseId);
          // deselect course when removing it from cart
          let updatedAllCourses = allCourses;
          updatedAllCourses[season][courseIndex].selected = false;

          const updatedSelectedCourses = selectedCourses.filter(function( course ) {
              return course.courseID !== courseId;
          });
            
          this.setState({
              selectedCourses: updatedSelectedCourses,
              allCourses: updatedAllCourses
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
        const {allCourses, selectedCourses, programResults, error} = this.state;

        return(
            <div className="container-fluid">
            {error &&
              <ErrorMessage 
                key={error.key} // this is used as a key to handle subsequent "identical" messages
                timeout={error.timeout}
                message={error.message}
              />
            }
              <Row>
                <Col sm={12} md={9}>
                  <section aria-label="Search Bar"/>
                  <SearchBar addCourseToCart={this.addSearchedCourseToCart}/>
                </Col>
              </Row>
              <Row>
                  <Col sm={12} md={9}>
                      <section aria-label="Course Selection"/>
                      <CourseSelection allCourses={allCourses} addCourseToCart={this.addCourseToCart} onSeasonChange={this.onSeasonChange}/> 
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
  