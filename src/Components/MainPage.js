import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';
import MapModal from './MapModal';
import SearchBar from './SearchBar';
import {fetchAllCourses, submitSelection} from '../api/courses-api';

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
            selectedSeason:"fall" // current season from CourseSelection
            };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addCourseToCart = this.addCourseToCart.bind(this);
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

      submitSelection({selections: courseIdList}).then(res => {
        this.setState({programResults: res.data.matchedPrograms});
        this.showModal();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
    }

    //confirm caps situation of class list object indexing
    onSeasonChange(selectedSeason){
        this.setState({selectedSeason});
      }
  
    addCourseToCart(courseId){
        const {selectedCourses, allCourses, selectedSeason} = this.state;
        const newCourseIndex = allCourses[selectedSeason].findIndex(course => course.courseID === courseId);
       
        let updatedAllCourses = allCourses;
        // mark course as selected so it cannot be added to cart twice
        updatedAllCourses[selectedSeason][newCourseIndex].selected = true;
        // track the semester of the course for deletion of courses. (allCourses is organzed by season)
        updatedAllCourses[selectedSeason][newCourseIndex].season = selectedSeason; 

        this.setState({
            selectedCourses: [...selectedCourses, allCourses[selectedSeason][newCourseIndex]],
            allCourses: updatedAllCourses
        });
    }

    removeCourseFromCart(courseId, season){
        const {allCourses, selectedCourses, selectedSeason} = this.state;
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

    showModal() {
        this.setState({ modalShown: true});
    }

    hideModal() {
        this.setState({ modalShown: false});
    }

    render() {
        const {allCourses, selectedCourses, programResults} = this.state;
        return(
            <div className="container-fluid">
            <Row>
              <Col sm={12} md={9}>
                <SearchBar/>
              </Col>
            </Row>
            <Row>
                <Col sm={12} md={9}>
                    <CourseSelection allCourses={allCourses} addCourseToCart={this.addCourseToCart} onSeasonChange={this.onSeasonChange}/> 
                </Col>

                <Col sm={12} md={3}>
                    {/* <div className="sample-fill"/> */}
                    <CourseCart submitCourses={this.submitCourses} selectedCourses={selectedCourses} removeCourseFromCart={this.removeCourseFromCart}/>

                </Col>
            </Row>

            {this.state.modalShown &&
            <MapModal hideModal={this.hideModal} programResults={programResults}></MapModal>
            }
            </div>
      );
    }
  }
  