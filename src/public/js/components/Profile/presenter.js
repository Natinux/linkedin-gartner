import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: undefined
        };
    }

    componentDidMount(){
        const {loadProfile} = this.props;
        const {profileId} = this.props.routeParams;

        loadProfile(profileId).then(profile => this.setState({profile})).catch(err => console.log(err));
    }

    render(){

        let {profileId} = this.props.routeParams;
        const {profile} = this.state;

        if(!profile) return <div></div>;
        return (
            <div>
                Profile

                <div className="header">
                    <h2>{profile.fullname}</h2>
                    <h4>{profile.currentTitle}</h4>
                    <h6>{profile.currentPosition}</h6>
                </div>
                <div className="sub-title">
                    <p>score: {profile.score}</p>
                    <a href={profile.url}>{profile.url}</a>

                </div>
                <div className="summary">
                    {profile.summary.split("\n").map((l, k) => <div key={k}>{l}</div>)}
                </div>

                <div className="experience">
                    <h4>Experience:</h4>
                    <ListGroup>
                        {
                            profile.experience.map((exp, key) => <ListGroupItem key={key} header={`${exp.title} - ${exp.dates}`}>{exp.company}</ListGroupItem>)
                        }
                    </ListGroup>

                </div>

                <div className="education">
                    <h4>Education:</h4>
                    <ul className="list-group">
                        {
                            profile.education.map((edu, key) => <li key={key} className="list-group-item">
                                <h4 className="list-group-item-heading">{`${edu.degree} ${edu.field}`}</h4>
                                <div className="list-group-item-text">
                                    <p>{edu.title}</p>
                                    <p>{edu.dates}</p>
                                </div>
                            </li>)
                        }
                    </ul>

                </div>

                <div className="skills ReactTags__tags">
                    <h4>Skills:</h4>
                    <div className="ReactTags__selected">
                        {
                            profile.skills.map((skill, key) => <span key={key} className="ReactTags__tag">{skill}</span>)
                        }
                    </div>
                </div>

            </div>
        );
    }
}