import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import './reactTags.css';
import Spinner from 'react-spinkit';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import ResultsProfiles from './resultsProfiles';

export default class Search extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            showResults: false,
            showQuery: true,
            selectedSkills: []
        };
    }

    componentDidMount(){
        const { loadSkills } = this.props;
        const { pageNumber } = this.props.params;
        this.setState({isLoading: true});
        loadSkills(pageNumber).then(() => this.setState({isLoading: false}));
    }

    handleDelete(i) {
        let skills = this.state.selectedSkills;
        skills.splice(i, 1);
        this.setState({selectedSkills: skills});
    }

    handleAddition(tag) {
        let selectedSkills = this.state.selectedSkills;
        selectedSkills.push({
            id: selectedSkills.length + 1,
            text: tag
        });
        this.setState({selectedSkills: selectedSkills});
    }

    handleInputChange(text){
        const { loadSkillsByName } = this.props;
        this.setState({isLoading: true});

        loadSkillsByName(text, 1).then((res) => this.setState({isLoading: false}));
    }

    onSearchClick(){
        const { searchBySkills } = this.props;
        const { selectedSkills } = this.state;

        this.setState({showResults: false});
        this.loadProfiles(1).then(res => this.setState({showResults: true}));
    }

    loadProfiles(page){
        const { searchByFields } = this.props;
        return searchByFields(this.buildQuery(), page);
    }

    buildQuery(){
        const { selectedSkills } = this.state;
        let fullname = ReactDOM.findDOMNode(this.refs.fullname).value;
        let title = ReactDOM.findDOMNode(this.refs.title).value;
        let position = ReactDOM.findDOMNode(this.refs.position).value;
        let summary = ReactDOM.findDOMNode(this.refs.summary).value;
        let skills = selectedSkills.map(s => s.text);

        let query = {};
        if(fullname) query['fullname'] = fullname;
        if(title) query['title'] = title;
        if(position) query['position'] = position;
        if(summary) query['summary'] = summary;
        if(skills && skills.length > 0) query['skills'] = skills;
        return query;
    }

    getQueryBUilderHtml(){

        const { selectedSkills } = this.state;
        const { Skills: { skills } } = this.props;

        let suggestions = skills.map(s => s.name);

        return (<div>
            <form>
                <FormGroup>
                    <ControlLabel>Full Name</ControlLabel>
                    <FormControl ref="fullname" type="text" placeholder="Enter text"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Current Title</ControlLabel>
                    <FormControl ref="title" type="text" placeholder="Enter text"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Current Position</ControlLabel>
                    <FormControl ref="position" type="text" placeholder="Enter text"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Summary</ControlLabel>
                    <FormControl ref="summary" type="text" placeholder="Enter text"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Skills</ControlLabel>
                    <ReactTags tags={selectedSkills}
                               autofocus={true}
                               suggestions={suggestions}
                               minQueryLength={1}
                               handleInputChange={::this.handleInputChange}
                               handleDelete={::this.handleDelete}
                               handleAddition={::this.handleAddition}
                               placeholder="Add another skill"
                    />
                </FormGroup>

            </form>

            <Button bsStyle="primary" onClick={::this.onSearchClick}>Search</Button>
        </div>);
    }

    render(){
        const { isLoading } = this.state;


        return (
            <div>
                <h3>Search</h3>

                {
                    isLoading ? <Spinner spinnerName='three-bounce' /> : null
                }

                {
                    this.state.showQuery ? ::this.getQueryBUilderHtml() : null
                }

                {
                    this.state.showResults ? <ResultsProfiles loadProfiles={::this.loadProfiles}/> : null
                }
            </div>
        );
    }
}