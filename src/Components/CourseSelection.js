import '../css/course-selection.css';
import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';
import {fetchAllCourses} from '../../api/courses-api';

const generateCourseList = (allCourses, addCourseToCart) => {
    return allCourses.map((course, index) => {
      return (
          <React.Fragment>
            <span
                className={"fake-link"}
                key={course.id}
                id={course.id}
                name={course.name}
                onClick={!course.selected ? () => addCourseToCart(course.id) : null}
            > 
            {course.code} 
            </span>
            <br/>
        </React.Fragment>
      );
    })
  }


export default class CourseSelection extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fallCourseList:[]
      };
    }

    componentDidMount(){
      fetchAllCourses().then(res => {
        this.setState({fallCourseList: res.data});
        console.log(res.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
    })
  }

    render() {
        const {allCourses, addCourseToCart} = this.props;
        return(
            <div className="course-selection">
                <h2> Course Selection </h2>
                <Tabs defaultActiveKey="fall" id="uncontrolled-tab-example">
                    <Tab eventKey="fall" title="Fall">
                    {generateCourseList(allCourses, addCourseToCart)}
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </Tab>
                    <Tab eventKey="winter" title="Winter">
                    </Tab>
                    <Tab eventKey="spring-summer" title="Spring/Summer">
                    </Tab>
                </Tabs> 
            </div>
        );
    }
  }
  