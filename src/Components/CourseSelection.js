import '../css/course-selection.css';
import React from 'react';
import {Col, Row, Tabs, Tab, Nav} from 'react-bootstrap';

const generateCourseList = (allCourses, addCourseToCart) => {
    return allCourses.map((course, index) => {
      return (
          <React.Fragment key={course.courseID}>
            <span
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
{/*                <Tabs defaultActiveKey="fall" id="uncontrolled-tab-example" onSelect={this.seasonChange.bind(this)}>
                    <Tab eventKey="fall" title="Fall">
                    {Object.keys(allCourses).length > 0 && generateCourseList(allCourses[currentSeason], addCourseToCart)}
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </Tab>
                    <Tab eventKey="winter" title="Winter">
                    </Tab>
                    <Tab eventKey="springSummer" title="Spring/Summer">
                    </Tab>
                </Tabs>*/}

                <Tab.Container id="tab-bar">
                    <div className="navbar navbar-expand-md navigation-menu">
                      <Nav className="navbar-nav nav nav-pills flex-column flex-lg-row flex-md-row" defaultActiveKey="fall" onSelect={this.seasonChange.bind(this)}>
                        <Nav.Item>
                          <Nav.Link className="nav-item nav-link" eventKey="fall" title="Fall">Fall</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link className="nav-item nav-link" eventKey="winter" title="Winter">Winter</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link className="nav-item nav-link" eventKey="spring" title="Spring">Spring</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link className="nav-item nav-link" eventKey="summer" title="Summer">Summer</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                    <Tab.Content>
                      <Tab.Pane className="tab-pane" eventKey="fall">
                        {Object.keys(allCourses).length > 0 && generateCourseList(allCourses[currentSeason], addCourseToCart)}
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane" eventKey="winter">
                        Winter Content
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane" eventKey="spring">
                        Spring Content
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane" eventKey="summer">
                        Summer Content
                      </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

{/*                <nav id="tab-bar" className="navbar navbar-expand-md navigation-menu">
                  <div className="container">
                    <button className="navbar-toggler tab-toggler collapsed" type="button" data-toggle="collapse" data-target="#tabMenu" aria-controls="tabMenu" aria-expanded="false" aria-label="Toggle navigation">
                    Active Text
                    </button>
                    <div className="collapse navbar-collapse tab-collapse" id="tabMenu">
                      <nav className="navbar-nav nav nav-pills flex-column flex-lg-row flex-md-row" id="myTab" role="tablist">
                        <a className="nav-item nav-link active" id="tab-one-label" data-toggle="tab" href="#tab-one" role="tab" aria-controls="nav-one" aria-selected="true">Section One</a>
                        <a className="nav-item nav-link" id="tab-two-label" data-toggle="tab" href="#tab-two" role="tab" aria-controls="nav-two" aria-selected="false">Section Two</a>
                        <a className="nav-item nav-link" id="tab-three-label" data-toggle="tab" href="#tab-three" role="tab" aria-controls="nav-three" aria-selected="false">Section Three</a>
                      </nav>
                    </div>
                  </div>
                </nav>*/}
            </div>
        );
    }
  }
  