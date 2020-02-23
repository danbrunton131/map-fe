import '../css/course-selection.css';
import React from 'react';
import {Col, Row, Tabs, Tab} from 'react-bootstrap';
import {fetchAllCourses} from '../api/courses-api';

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
  // BE input should be provided in a simpler way:  {Fall: [all courses], Winter: [all courses]}
  // This is a workaround
  const getAllSeasonCourses = (seasonCourses) => {
    let allCourses = [];
    for (let classType in seasonCourses){ 
      const classTypeList = seasonCourses[classType];
      for (let i=0; i<classTypeList.length;i++){ //i is the course itself
        allCourses.push(classTypeList[i]);
      }
    }
    return allCourses;
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
        console.log(res.data.courseLists.Fall);
        const fallCourses = getAllSeasonCourses(res.data.courseLists.Fall);
        this.setState({fallCourseList: fallCourses});
        console.log(fallCourses);
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
  