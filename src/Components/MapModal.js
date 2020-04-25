import '../css/results.css';
import React from 'react';
import {Modal, Button, Row, Col, Container} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';
import { faAngleDown, faAngleUp, faPlusCircle, faShoppingCart, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import SmoothCollapse from 'react-smooth-collapse';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';



const genProgramRequirements = (requirements, fulfilledCourses, programId) => {
    return (
        <ul>
            {requirements.map((requirement, index) => {
                return ( <li key={`${programId}-${index}`}>{requirement}</li> );})
            }
        </ul>
        );
}



const genProgramResults = (programResults) => {
    return programResults.map((program, index) => {
        const greenHex = "#4dac26"; //colorblind safe "green/good"
        const redHex = "#d01c8b"; //colorblind safe "red/bad"
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
                redHex,
                backgroundHex
                ],
                hoverBackgroundColor: [
                greenHex,
                redHex,
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
            currentPage: 1,
            pageSize: 5,
            numPages: 1,
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
  
    handleCloseModal () {
        this.props.hideModal();
    }

    incrementPagination(numPages, currentPage) {
        if (currentPage < numPages) {
            this.setState((state, props) => ({
                currentPage: state.currentPage+1
            }));
        }
    }

    decrementPagination(numPages, currentPage) {
        if (currentPage > 1) {
            this.setState((state, props) => ({
                currentPage: state.currentPage-1
            }));
        }
    }

    goToPage(pageNum) {
        this.setState({currentPage: pageNum});
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
        if (currentPage > 3) { items.push(<Pagination.Ellipsis aria-label="More pages" key={"firstEllipsis"} />); }

        if (currentPage < 3) {
            for (let number = 1; number <= 5; number++) {
                items.push(
                    this.createPaginationItem(number, currentPage)
                );
            }
        }
        else if (currentPage > numPages-2) {
            for (let number = numPages-4; number <= numPages; number++) {
                items.push(
                    this.createPaginationItem(number, currentPage)
                );
            }
        }
        else {
            for (let number = currentPage-2; number <= currentPage+2; number++) {
                items.push(
                    this.createPaginationItem(number, currentPage)
                );
            }
        }

        if (currentPage < numPages-2) { items.push(<Pagination.Ellipsis aria-label="More pages" key={"secondEllipsis"} />); }
        items.push(<Pagination.Next aria-label="Next page" key={"next"} onClick={() => this.incrementPagination(numPages, currentPage)} />);

        const pagination = (
            <div>
                <Pagination>{items}</Pagination>
            </div>
        );
        return pagination;
    }
    
    render () {
        const {sortedProgramResults, currentPage, pageSize} = this.state;

        let numPages = Math.ceil(sortedProgramResults.length / pageSize);

        const shownResults = sortedProgramResults.slice((currentPage-1)*pageSize, (currentPage-1)*pageSize + 5);

        const pagination = this.createPagination(numPages, currentPage);

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