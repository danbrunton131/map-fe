import '../css/results.css';
import React from 'react';
import {Modal, Button, Row, Col, Container} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';

export const boldString = (s, b) => {
    return s.replace(RegExp(b), `<strong>${b}</strong>`);
}

const genProgramRequirements = (requirements, fulfilledCourses, programId) => {
    
    //embolden first match of each fulfilledCourse
    for (let fulfilledCourseIndex=0; fulfilledCourseIndex< fulfilledCourses.length; fulfilledCourseIndex++){
        for (let reqIndex=0; reqIndex< requirements.length; reqIndex++){
            if (requirements[reqIndex] && fulfilledCourses[fulfilledCourseIndex]){

                const  match = requirements[reqIndex].search(fulfilledCourses[fulfilledCourseIndex]) >= 0;
                if(match){
                    requirements[reqIndex] = boldString(requirements[reqIndex], fulfilledCourses[fulfilledCourseIndex]);
                }
            }
        }
    }
    // // Track a partially fulfilled requirement
    // const requirementsCopy = [...requirements]; // clone requirements so we don't modify original! We need to show it. 
    // let satisfiedRequirements = []; // indices of matching requirements
    // for (let i=0; i< fulfilledCourses.length; i++){
    //     const satisfiedRequirementIndex = requirementsCopy.findIndex(requirement => requirement.includes(fulfilledCourses[i])); //find a requirement match
    //     // requirementsCopy.splice(satisfiedRequirementIndex, 1); // remove the matching requirement?

    //     if (satisfiedRequirementIndex!==-1){
    //         // console.log(satisfiedRequirementIndex);
    //         satisfiedRequirements.push(satisfiedRequirementIndex)
    //     }
    //  }

    return (
        <ul>
            {requirements.map((requirement, index) => {
                return (
                <li key={`${programId}-${index}`}>
                    <div dangerouslySetInnerHTML={{ __html: requirement }} /> {/* We need to represent the bold fulfilled courses */}
                </li> );})
            }
        </ul>
        );
}

const genProgramResults = (programResults) => {
    return programResults.map((program, index) => {
        const greenHex = "#4dac26"; // satisfied color
        const greyHex = "#dbdbdd"; // unsatisfied
        const backgroundHex = "#FFCE56";
        const chartData = {
            labels: [
                'Satisfied',
                'Unsatisfied'
            ],
            datasets: [{ 
                data: [program.programPercentage, 1-program.programPercentage],
                backgroundColor: [
                greenHex,
                greyHex,
                backgroundHex
                ],
                hoverBackgroundColor: [
                greenHex,
                greyHex,
                backgroundHex
                ]
            }]
        };
        // Converting pie values to percentages: https://bit.ly/3eFMKfn
        const options = {
            legend: {
                // position: 'left', 
                onClick: (e) => e.stopPropagation(),
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                  var total = meta.total;
                  var currentValue = dataset.data[tooltipItem.index];
                  var percentage = parseFloat((currentValue/total*100).toFixed(1));
                  return percentage + '%';
                },
                title: function(tooltipItem, data) {
                  return data.labels[tooltipItem[0].index];
                }
            }
        }
    }
        const completePercentage = parseFloat((chartData.datasets[0].data[0]*100).toFixed(1));
        const incompletePercentage = parseFloat((chartData.datasets[0].data[1]*100).toFixed(1));
        return (
            <React.Fragment key={index}>
                <Container>
                    <div className="program-result" aria-label={`${program.programName} is ${completePercentage}% complete and ${incompletePercentage}% incomplete`} tabIndex={0}>  
                        <Row>
                            <Col sm={12} md={8}>
                                <div className="description">
                                    <h2>{program.programName}</h2>
                                    <p>{`Lorem Ipsum ${program.programDescription}`}</p>
                                    <div tabIndex={0} className="description-textbox">
                                        <strong> Requirements </strong>
                                        {genProgramRequirements(program.programRequirements.requirements, program.fulfilledCourses, program.programId)}
                                    </div>


                                </div>
                            </Col>
                            <Col sm={12} md={4}>
                                <Pie data={chartData} options={options}width={100} height={100}/>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </React.Fragment>
        );
    });
}


/* Sort programResults, largest percentage first */
export const sortProgramResults = (programResults) => {
    return programResults.sort((a, b) => {
        return b.programPercentage - a.programPercentage;
    });
}

export default class ExampleApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            sortedProgramResults: sortProgramResults(this.props.programResults),
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
  
    handleCloseModal () {
        this.props.hideModal();
    }
    
    render () {
        const {sortedProgramResults} = this.state;
        return (
            <Modal
                show={true} 
                dialogClassName={"primary-modal"} 
                size="lg" 
                onHide={this.handleCloseModal}
            >
                <Modal.Header id="modal-header" closeButton>
                    <Modal.Title id="modal-title">Program Results</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body">
                    {/* Program Result Component */}
                    {Object.keys(sortedProgramResults).length > 0 &&
                        genProgramResults(sortedProgramResults)}
                </Modal.Body>
                <Modal.Footer id="modal-footer">
                    <Button variant="btn btn-primary" onClick={this.handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}