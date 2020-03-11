import '../css/course-selection.css';
import React from 'react';
import { Tab, Nav} from 'react-bootstrap';

const generateCourseList = (allCourses, addCourseToCart) => {
    return allCourses.map((course, index) => {
      return (
          <React.Fragment key={course.courseID}>
            <span
                tabIndex={0}
                className={"fake-link"}
                id={course.courseID}
                name={course.name}
                onClick={!course.selected ? () => addCourseToCart(course.courseID) : null}
            > 
            {course.courseCode} 
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
        currentSeason: 'fall',
      };
    }    

    seasonChange(season){
      this.setState({currentSeason:season}, this.props.onSeasonChange(season));
    }

    render() {
      const {allCourses, addCourseToCart} = this.props;
      const {currentSeason} = this.state;

      return(
          <div className="course-selection">
              <h2> Course Selection </h2>
              <Tab.Container id="tab-bar" defaultActiveKey="fall">
                  <div className="navbar navbar-expand-md navigation-menu">
                    <Nav className="navbar-nav nav nav-pills flex-column flex-lg-row flex-md-row" onSelect={this.seasonChange.bind(this)}>
                      <Nav.Item tabIndex={0}>
                        <Nav.Link className="nav-item nav-link" eventKey="fall" title="Fall">Fall</Nav.Link>
                      </Nav.Item>
                      <Nav.Item tabIndex={0}>
                        <Nav.Link className="nav-item nav-link" eventKey="winter" title="Winter">Winter</Nav.Link>
                      </Nav.Item>   
                      <Nav.Item tabIndex={0}>
                        <Nav.Link className="nav-item nav-link" eventKey="spring" title="Spring">Spring</Nav.Link>
                      </Nav.Item>
                      <Nav.Item tabIndex={0}>
                        <Nav.Link className="nav-item nav-link" eventKey="summer" title="Summer">Summer</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane className="tab-pane" eventKey={currentSeason}>
                      {/* show loading text until course list loads. */}
                      { !allCourses[currentSeason] ? <div> Loading... </div> :
                        allCourses[currentSeason].length > 0 ?
                          generateCourseList(allCourses[currentSeason], addCourseToCart) 
                        : <div> There are no courses available for this Term.</div>
                      }
                    </Tab.Pane>
                  </Tab.Content>
              </Tab.Container>
          </div>
      );
  }
}
  