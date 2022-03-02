import '../css/results.css';
import React, {createRef} from 'react';
import PropTypes from 'prop-types';

import {Modal, Button, Row, Col, Container} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';
import Pagination from 'react-bootstrap/Pagination';
import {boldAllMatches} from '../common/utilities';


const MAC_SITES_PROGRAMS_URL = "https:/mps-macsites.mcmaster.ca/mapsci/beyond-level-1/programs/";

/* Sort programResults, largest percentage first */
export const sortProgramResults = (programResults) => {
    return programResults.sort((a, b) => {
        return b.programPercentage - a.programPercentage;
    });
}

// requirements are structured like [reqString1, reqString2,...]
// fulfilledCourses follow the same indexing as requirements, but instead include an array of courses satisfied in that requirement. 
const genProgramRequirements = (requirements, fulfilledCourses, programId) => {
    for (let reqIndex=0; reqIndex< requirements.length; reqIndex++){
        for (let fulfilledCourseIndex=0; fulfilledCourseIndex<fulfilledCourses.length; fulfilledCourseIndex++){
            const fulfilledCourse = fulfilledCourses[reqIndex][fulfilledCourseIndex];
            if (requirements[reqIndex] && fulfilledCourse){ //verify the fulfilled course isn't an empty array for this requirement
                requirements[reqIndex] = boldAllMatches(requirements[reqIndex], fulfilledCourse); // bold all instances of fulfilled course in this specific requirement. 
            }
        }
    }
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
        const greyHex = "#efefef"; // unsatisfied
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
                                    <div class="h3">{program.programName}</div>
                                    { program.programSlug && 
                                        <a 
                                            href={MAC_SITES_PROGRAMS_URL + "/" + program.programSlug}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                        Learn More
                                        </a>
                                    }
                                    <div tabIndex={0} className="description-textbox">
                                        <strong>Requirements</strong>
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

export default class MapModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            sortedProgramResults: sortProgramResults(this.props.programResults),
            currentPage: 1,
            pageSize: 5,
            numPages: 1,
            shownResults: [],
            pagination: [],
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.modalRef = createRef();
    }

    componentDidMount() {
        const {sortedProgramResults, currentPage, pageSize} = this.state;

        let numPages = Math.ceil(sortedProgramResults.length / pageSize);

        const newShownResults = sortedProgramResults.slice((currentPage-1)*pageSize, (currentPage-1)*pageSize + 5);

        this.setState((state, props) => ({
            shownResults: newShownResults,
            numPages: numPages,
            pagination: this.createPagination(numPages, currentPage),
        }));
    }
  
    handleCloseModal () {
        this.props.hideModal();
    }

    incrementPagination(numPages, currentPage) {
        if (currentPage < numPages) {
            this.setState((state, props) => ({
                currentPage: state.currentPage+1,
                shownResults: this.genResults(currentPage+1),
                pagination: this.createPagination(numPages, currentPage+1),
            }));
        }
    }

    decrementPagination(numPages, currentPage) {
        if (currentPage > 1) {
            this.setState((state, props) => ({
                currentPage: state.currentPage-1,
                shownResults: this.genResults(currentPage-1),
                pagination: this.createPagination(numPages, currentPage-1),
            }));
        }
    }

    goToPage(pageNum) {
        this.setState((state, props) => ({
            currentPage: pageNum,
            shownResults: this.genResults(pageNum),
            pagination: this.createPagination(state.numPages, pageNum),
        }));
    }

    genResults(pageNum) {
        const {sortedProgramResults, pageSize} = this.state;
        const newShownResults = sortedProgramResults.slice((pageNum-1)*pageSize, (pageNum-1)*pageSize + 5);
        return newShownResults;
    }

    createPaginationItem(number, currentPage) {
        return (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => this.goToPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    createPagination(numPages, currentPage) {
        let items = [];

        items.push(<Pagination.Prev aria-label="Previous page" key={"prev"} onClick={() => this.decrementPagination(numPages, currentPage)} />);
        if (currentPage > 3 && numPages > 5) { items.push(<Pagination.Ellipsis aria-label="More pages" key={"firstEllipsis"} />); }

        if (currentPage < 3) {
            for (let number = 1; number <= 5; number++) {
                if (number <= numPages) {
                    items.push(
                        this.createPaginationItem(number, currentPage)
                    );
                }
            }
        }
        else if (currentPage > numPages-2) {
            for (let number = numPages-4; number <= numPages; number++) {
                if (number <= numPages && number > 0) {
                    items.push(
                        this.createPaginationItem(number, currentPage)
                    );
                }
            }
        }
        else {
            for (let number = currentPage-2; number <= currentPage+2; number++) {
                if (number <= numPages) {
                    items.push(
                        this.createPaginationItem(number, currentPage)
                    );
                }
            }
        }

        if (currentPage < numPages-2 && numPages > 5) { items.push(<Pagination.Ellipsis aria-label="More pages" key={"secondEllipsis"} />); }
        items.push(<Pagination.Next aria-label="Next page" key={"next"} onClick={() => this.incrementPagination(numPages, currentPage)} />);

        const pagination = (
            <div>
                <Pagination>{items}</Pagination>
            </div>
        );
        this.modalRef.current.scrollTop = 0; // when changing pages, return to top of modal content
        return pagination;
    }
    
    render () {
        const {shownResults, pagination} = this.state;

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
                <Modal.Body id="modal-body" ref={this.modalRef}>
                    {/* Program Result Component */}
                    {Object.keys(shownResults).length > 0 &&
                        genProgramResults(shownResults)}
                </Modal.Body>
                <Modal.Footer id="modal-footer">
                    <div className="footer-container">
                        <div className="pagination">
                            {pagination}
                        </div>
                        <Button className="close-button" variant="btn btn-primary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

MapModal.propTypes = {
    programResults: PropTypes.array.isRequired,
    hideModal: PropTypes.func.isRequired,
}