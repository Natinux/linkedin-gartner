import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Spinner from 'react-spinkit';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';

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
        const { loadProfiles, Profiles } = this.props;
        let pageNumber = Profiles.page;
        loadProfiles(pageNumber).then(() => this.setState({isLoading: false}));
    }

    handleNextClick(){
        this.setState({isLoading: true});
        const { loadProfiles , Profiles } = this.props;
        let pageNumber = Profiles.page;
        let nextPage = +pageNumber + 1;
        browserHistory.push(`/profiles/${nextPage}`);
        loadProfiles(nextPage).then(() => this.setState({isLoading: false}));
    }

    handlePreviousClick(){
        this.setState({isLoading: true});
        const { loadProfiles , Profiles } = this.props;
        let pageNumber = Profiles.page;
        let prevPage = +pageNumber - 1;
        browserHistory.push(`/profiles/${prevPage}`);
        loadProfiles(prevPage).then(() => this.setState({isLoading: false}));
    }

    onItemsLimitSelect(numOfItems){
        const { loadProfiles , Profiles } = this.props;
        let pageNumber = Profiles.page;
        this.setState({itemsPerPage: numOfItems, isLoading: true});
        loadProfiles(+pageNumber, numOfItems).then(() => this.setState({isLoading: false}));
    }

    render(){
        const { Profiles, Profiles: { pages, page } } = this.props;
        const { isLoading } = this.state;
        const profiles = Profiles.profiles ? Profiles.profiles : [];
        const haveNextPage = (pages - page) > 0;
        const havePreviousPage = page > 1;

        return (
            <div>
                <h3>Profiles</h3>

                <DropdownButton onSelect={::this.onItemsLimitSelect} bsStyle={"default"} title={this.state.itemsPerPage} id={`dropdown-basic-size`}>
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
                            <th>Fullname</th>
                            <th>Title</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                profiles.map((profile, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key}</th>
                                            <td><Link to={`/profile/${profile.id}`}>{profile.fullname}</Link></td>
                                            <td>{profile.currentTitle}</td>
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