import React from 'react';
import {Modal, Button, Row, Col, Container} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';

const generateProgramResults = (programResults, chartRefs) => {
    return programResults.map((program, index) => {
        const chartData = {
            labels: [
                'Satisfied',
                'Unsatisfied'
            ],
            datasets: [{
                data: [program.programPercentage, 1-program.programPercentage],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
        return (
            <React.Fragment key={index}>
                <Container>
                    <div className="program-result">
                        <Row>
                        <Col sm={12} md={8}>
                            <div className="description">
                                <h2>{program.programName}</h2>
                                <p>{program.programDescription}</p>
                                <p>Add clickability to expand each entry to show unmet requirements.</p>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <Pie ref={chartRefs[index]} data={chartData} width={100} height={100} />
                        </Col>
                        </Row>
                    </div>
                </Container>
            </React.Fragment>
        );
    });
}

export default class ExampleApp extends React.Component {
    constructor (props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.chartRefs = [];

        this.chartRef1 = React.createRef();
        this.chartRef2 = React.createRef();
    }

    /* Sort programResults, largest percentage first */
    sortProgramResults() {
        this.props.programResults.sort((a, b) => {
            return a.programPercentage - b.programPercentage;
        });
    }

    /* Create a react reference to each chart */
    /* Might not need this */
    generateChartRefsArray() {
        this.sortProgramResults();

        this.props.programResults.map((program, index) => {
            this.chartRefs[index] = new React.createRef();
        });
        return true;
    }
  
    handleCloseModal () {
        this.props.hideModal();
    }
    
    render () {
        const {programResults} = this.props;
        return (
            <Modal
                show={true} 
                dialogClassName={"primary-modal"} 
                size="lg" 
                onHide={this.handleCloseModal}
            >
                <Modal.Header id="modal-header" closeButton>
                    <Modal.Title id="modal-title">Results</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body">
                    {/* Program Result Component */}
                    {Object.keys(programResults).length > 0 && this.generateChartRefsArray() &&
                        generateProgramResults(programResults, this.chartRefs)}
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