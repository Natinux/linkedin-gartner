import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadProfiles } from '../../actions';
import Profiles from './presenter';

const mapStateToProps = ({ Profiles }) => ({
    Profiles
});

const mapDispatchToProps = dispatch => ({
    loadProfiles: (pageNumber, limit) => dispatch(loadProfiles(pageNumber, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);