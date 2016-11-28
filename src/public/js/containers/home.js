import 'font-awesome/css/font-awesome.css';
import './home.less';
import {Link} from 'react-router';
import {Navbar} from 'react-bootstrap';
import React, { Component } from 'react';
import Alert from '../components/Alert';

const Home = ({ children }) => {
    return <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">IN Parser</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <ul className="nav navbar-nav">
                    <li className="presentation">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="presentation">
                        <Link to="/profiles/1">Profiles</Link>
                    </li>
                    <li className="presentation">
                        <Link to="/skills/1">Skills</Link>
                    </li>
                    <li className="presentation">
                        <Link to="/search">Search</Link>
                    </li>
                </ul>
            </Navbar.Collapse>
        </Navbar>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <Alert/>
                {children}
            </div>
        </div>
    </div>;

};

export default Home;