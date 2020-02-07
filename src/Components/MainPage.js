import React from 'react';
import {Col, Row} from 'react-bootstrap';
import CourseCart from './CourseCart';
import CourseSelection from './CourseSelection';
import MapModal from './MapModal';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCourses:[
                {id:0, code:'LIFESCI 1D03', name:'Medical Imaging Physics'},
                {id:1, code:'CHEM 1A03', name:'Introductory Chemistry I'},
            ],
            selectedCourses:[],
            modalShown: false
            };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addCourseToCart = this.addCourseToCart.bind(this);
        this.removeCourseFromCart = this.removeCourseFromCart.bind(this);
    }

    addCourseToCart(courseId){
        const {selectedCourses, allCourses} = this.state;
        const newCourseIndex = allCourses.findIndex(course => course.id === courseId);
       
        this.setState({
            selectedCourses: [...selectedCourses, allCourses[newCourseIndex]],
            allCourses: [...allCourses, allCourses[newCourseIndex].selected=true]
        });
    }

    removeCourseFromCart(courseId){
        const {allCourses, selectedCourses} = this.state;
        const courseIndex = allCourses.findIndex(course => course.id === courseId);

        const updatedCourseList = selectedCourses.filter(function( course ) {
            return course.id !== courseId;
        });
          
        this.setState({
            selectedCourses: updatedCourseList,
            allCourses:[...allCourses, allCourses[courseIndex].selected=false]
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
                    <CourseSelection allCourses={allCourses} addCourseToCart={this.addCourseToCart} /> 
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
  