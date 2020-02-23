import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';
import MapModal from './MapModal';
import {fetchAllCourses} from '../api/courses-api';


  // BE input should be provided in a simpler way:  {Fall: [all courses], Winter: [all courses]}
  // This is a workaround
  const getAllSeasonCourses = (seasonCourses) => {
    let allSeasonCourses = [];
    for (let classType in seasonCourses){ 
      const classTypeList = seasonCourses[classType];
      for (let i=0; i<classTypeList.length;i++){ //i is the course itself
        allSeasonCourses.push(classTypeList[i]);
      }
    }
    return allSeasonCourses;
  }


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCourses:[
                {id:0, code:'LIFESCI 1D03', name:'Medical Imaging Physics'},
                {id:1, code:'CHEM 1A03', name:'Introductory Chemistry I'},
            ],
            fallCourses:[],
            selectedCourses:[],
            modalShown: false,
            };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addCourseToCart = this.addCourseToCart.bind(this);
        this.removeCourseFromCart = this.removeCourseFromCart.bind(this);
    }

    componentDidMount(){
        fetchAllCourses().then(res => {
          const fallCourses = getAllSeasonCourses(res.data.courseLists.Fall);
          this.setState({fallCourses: fallCourses});
          console.log(fallCourses);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
      })
    }
  

    // addCourseToCart(courseId){
    //     const {selectedCourses, allCourses} = this.state;
    //     const newCourseIndex = allCourses.findIndex(course => course.id === courseId);
       
    //     this.setState({
    //         selectedCourses: [...selectedCourses, allCourses[newCourseIndex]],
    //         allCourses: [...allCourses, allCourses[newCourseIndex].selected=true]
    //     });
    // }

    // removeCourseFromCart(courseId){
    //     const {allCourses, selectedCourses} = this.state;
    //     const courseIndex = allCourses.findIndex(course => course.id === courseId);

    //     const updatedCourseList = selectedCourses.filter(function( course ) {
    //         return course.id !== courseId;
    //     });
          
    //     this.setState({
    //         selectedCourses: updatedCourseList,
    //         allCourses:[...allCourses, allCourses[courseIndex].selected=false]
    //     });
    // }


    addCourseToCart(courseId){
        const {selectedCourses, fallCourses} = this.state;
        const newCourseIndex = fallCourses.findIndex(course => course.courseID === courseId);
       
        this.setState({
            selectedCourses: [...selectedCourses, fallCourses[newCourseIndex]],
            allCourses: [...fallCourses, fallCourses[newCourseIndex].selected=true]
        });
    }

    removeCourseFromCart(courseId){
        const {fallCourses, selectedCourses} = this.state;
        const courseIndex = fallCourses.findIndex(course => course.courseID === courseId);

        const updatedCourseList = selectedCourses.filter(function( course ) {
            return course.id !== courseId;
        });
          
        this.setState({
            selectedCourses: updatedCourseList,
            allCourses:[...fallCourses, fallCourses[courseIndex].selected=false]
        });
    }


    showModal() {
        this.setState({ modalShown: true});
    }

    hideModal() {
        this.setState({ modalShown: false});
    }

    render() {
        const {allCourses, fallCourses, selectedCourses, courseListLoaded} = this.state;
        console.log(fallCourses);
        return(
            <div className="container-fluid">
            <Row>
                <Col sm={12} md={9}>
                    <CourseSelection allCourses={fallCourses} addCourseToCart={this.addCourseToCart} /> 
                </Col>

                <Col sm={12} md={3}>
                    {/* <div className="sample-fill"/> */}
                    <CourseCart showResults={this.showModal} selectedCourses={selectedCourses} removeCourseFromCart={this.removeCourseFromCart}/>

                </Col>
            </Row>

            {this.state.modalShown &&
            <MapModal hideModal={this.hideModal}> </MapModal>
            }
            </div>
      );
    }
  }
  