import '../css/course-selection.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Nav} from 'react-bootstrap';
import Course from './Course';

const generateCourseList = (courseSelectionList, addCourseToCart) => {
    // divide list in two and return two columns
    const half_length = Math.ceil(courseSelectionList.length / 2);
    const leftSide = courseSelectionList.slice(0, half_length);
    const rightSide = courseSelectionList.slice(half_length);

    return (
      <div className="course-col-container">
        <div className="course-col">
          { generateCourseCol(leftSide, addCourseToCart) }
        </div>

        <div className="course-col">
          { generateCourseCol(rightSide, addCourseToCart) }
        </div>
      </div>
    );
  }

  const generateCourseCol = (courseList, addCourseToCart) => {
    return courseList.map((course, index) => {
      return ( <Course style={{display: "inline-block"}} key={course.courseID} course={course} addCourseToCart={addCourseToCart} /> );
    });
  }

  export default class CourseSelection extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentSeason: 'fall',
      };
    }    

    seasonChange(season){
      this.setState({currentSeason:season}, this.props.onSeasonChange(season));
    }

    render() {
      const {courseSelectionList, addCourseToCart} = this.props;
      const {currentSeason} = this.state;

      return(
          <div className="course-selection">
              <h2> Course Selection </h2>
              <Tab.Container id="tab-bar" defaultActiveKey="fall">
                  <div className="navbar navbar-expand-md navigation-menu">
                    <Nav className="navbar-nav nav nav-pills flex-column flex-lg-row flex-md-row" onSelect={this.seasonChange.bind(this)} role="navigation">
                      <Nav.Item>
                        <Nav.Link className="nav-item nav-link" eventKey="fall" title="Fall">Fall</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="nav-item nav-link" eventKey="winter" title="Winter">Winter</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane className="tab-pane" eventKey={currentSeason}>
                      <div className="course-container">
                        {/* show loading text until course list loads. */}
                        { !courseSelectionList[currentSeason] ? <div> Loading... </div> :
                          courseSelectionList[currentSeason].length > 0 ?
                            generateCourseList(courseSelectionList[currentSeason], addCourseToCart) 
                          : <div> There are no courses available for this Term.</div>
                        }
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
              </Tab.Container>
          </div>
      );
  }
}
  
CourseSelection.propTypes = {
  courseSelectionList: PropTypes.object.isRequired,
  addCourseToCart: PropTypes.func.isRequired,
  onSeasonChange: PropTypes.func.isRequired,
}