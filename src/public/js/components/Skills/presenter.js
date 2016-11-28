import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Spinner from 'react-spinkit';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class Profiles extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            haveNextPage: false,
            havePreviousPage: false,
            itemsPerPage: 10
        };
    }

    componentDidMount(){
        const { loadSkills } = this.props;
        const { pageNumber } = this.props.params;
        loadSkills(pageNumber, this.state.itemsPerPage).then(() => this.setState({isLoading: false}));
    }

    handleNextClick(){
        this.setState({isLoading: true});
        const { loadSkills , routeParams: {pageNumber} } = this.props;
        let nextPage = +pageNumber + 1;
        browserHistory.push(`/skills/${nextPage}`);
        loadSkills(nextPage, this.state.itemsPerPage).then(() => this.setState({isLoading: false}));
    }

    handlePreviousClick(){
        this.setState({isLoading: true});
        const { loadSkills , routeParams: {pageNumber} } = this.props;
        let prevPage = +pageNumber - 1;
        browserHistory.push(`/skills/${prevPage}`);
        loadSkills(prevPage, this.state.itemsPerPage).then(() => this.setState({isLoading: false}));
    }

    onSizeSelect(numOfItems){
        const { loadSkills , routeParams: {pageNumber} } = this.props;
        this.setState({itemsPerPage: numOfItems, isLoading: true});
        loadSkills(+pageNumber, numOfItems).then(() => this.setState({isLoading: false}));
    }

    render(){
        const { Skills, Skills: { pages, page } } = this.props;
        const { isLoading } = this.state;
        const skills = Skills.skills ? Skills.skills : [];
        const haveNextPage = (pages - page) > 0;
        const havePreviousPage = page > 1;

        return (
            <div>
                <h3>Skills</h3>

                <DropdownButton onSelect={::this.onSizeSelect} bsStyle={"default"} title={this.state.itemsPerPage} id={`dropdown-basic-size`}>
                    <MenuItem eventKey={10}>10</MenuItem>
                    <MenuItem eventKey={20}>20</MenuItem>
                    <MenuItem eventKey={50}>50</MenuItem>
                    <MenuItem eventKey={100}>100</MenuItem>
                </DropdownButton>

                {
                    isLoading ? <Spinner spinnerName='three-bounce' /> : null
                }

                <div className="table">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="thead-inverse">
                        <tr>
                            <th>#</th>
                            <th>Skill</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                skills.map((skill, key) => {
                                    return (
                                        <tr key={key+1}>
                                            <th scope="row">{key+1}</th>
                                            <td>{skill.name}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                </div>

                <ul className="pager" role="group">
                    <li className="previous">
                        <Button className="previous"
                                disabled={!havePreviousPage}
                                onClick={havePreviousPage ? ::this.handlePreviousClick : null} >
                            &larr; Previous Pag
                        </Button>
                    </li>
                    <li>
                        page {page} of {pages}
                    </li>
                    <li className="next">
                        <Button className="next"
                                disabled={!haveNextPage}
                                onClick={haveNextPage ? ::this.handleNextClick : null} >
                            Next Page &rarr;
                        </Button>
                    </li>
                </ul>

            </div>
        );
    }
}