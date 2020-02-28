import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';
import MapModal from './MapModal';
import {fetchAllCourses, submitSelection} from '../api/courses-api';

  // Remove course types from within a season
  // BE input should be provided in a simpler way:  {Fall: [all courses], Winter: [all courses]}
  const getAllSeasonCourses = (seasonCourses) => {
    let allSeasonCourses = [];
    for (let classType in seasonCourses){ 
      const classTypeList = seasonCourses[classType];
      for (let i=0; i<classTypeList.length;i++){ //i is the course itself
        allSeasonCourses.push({...classTypeList[i], key:classTypeList[i].courseID});
      }
    }
    return allSeasonCourses;
  }


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCourses:{},
            // allCourses:[
            //     {id:0, code:'LIFESCI 1D03', name:'Medical Imaging Physics'},
            //     {id:1, code:'CHEM 1A03', name:'Introductory Chemistry I'},
            // ],
            selectedCourses:[],
            modalShown: false,
            selectedSeason:"fall"
            };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addCourseToCart = this.addCourseToCart.bind(this);
        this.removeCourseFromCart = this.removeCourseFromCart.bind(this);
        this.onSeasonChange = this.onSeasonChange.bind(this);
    }

    //add springSummer once BE accounts for the same group
    componentDidMount(){
        fetchAllCourses().then(res => {
          const allCourses = {
            fall: getAllSeasonCourses(res.data.courseLists.Fall), 
            winter: getAllSeasonCourses(res.data.courseLists.Winter),
            spring: getAllSeasonCourses(res.data.courseLists.Spring),
            summer: getAllSeasonCourses(res.data.courseLists.Summer),
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

      submitSelection({selection: courseIdList}).then(res => {
        this.setState({programResults: res.data});
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
       
        // mark course as selected so it cannot be added to cart twice
        let updatedAllCourses = allCourses;
        updatedAllCourses[selectedSeason][newCourseIndex].selected = true;

        this.setState({
            selectedCourses: [...selectedCourses, allCourses[selectedSeason][newCourseIndex]],
            allCourses: updatedAllCourses
        });
    }

    removeCourseFromCart(courseId){
        const {allCourses, selectedCourses, selectedSeason} = this.state;
        const courseIndex = allCourses[selectedSeason].findIndex(course => course.courseID === courseId);

        // deselect course when removing it from cart
        let updatedAllCourses = allCourses;
        updatedAllCourses[selectedSeason][courseIndex].selected = false;

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
        const {allCourses, selectedCourses} = this.state;
        return(
            <div className="container-fluid">
            <Row>
                <Col sm={12} md={9}>
                    <CourseSelection allCourses={allCourses} addCourseToCart={this.addCourseToCart} onSeasonChange={this.onSeasonChange}/> 
                </Col>

                <Col sm={12} md={3}>
                    {/* <div className="sample-fill"/> */}
                    <CourseCart submitCourses={this.showModal} selectedCourses={selectedCourses} removeCourseFromCart={this.removeCourseFromCart}/>

                </Col>
            </Row>

            {this.state.modalShown &&
            <MapModal hideModal={this.hideModal}> </MapModal>
            }
            </div>
      );
    }
  }
  