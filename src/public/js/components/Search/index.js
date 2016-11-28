import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadSkills, loadSkillsByName, searchBySkills, searchByFields } from '../../actions';
import Search from './presenter';

const mapStateToProps = ({ Skills }) => ({
    Skills
});

const mapDispatchToProps = dispatch => ({
    loadSkills: pageNumber => dispatch(loadSkills(pageNumber)),
    loadSkillsByName: (name, pageNumber) => dispatch(loadSkillsByName(name, pageNumber)),
    searchBySkills: bindActionCreators(searchBySkills, dispatch),
    searchByFields: bindActionCreators(searchByFields, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);