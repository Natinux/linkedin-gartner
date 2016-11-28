import React from 'react';
import { connect } from 'react-redux';
import { loadSkills } from '../../actions';
import Skills from './presenter';

const mapStateToProps = ({ Skills }) => ({
    Skills
});

const mapDispatchToProps = dispatch => ({
    loadSkills: (pageNumber, limit) => dispatch(loadSkills(pageNumber, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Skills);