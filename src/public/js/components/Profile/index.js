import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadProfile } from '../../actions';
import Profile from './presenter';

// const mapStateToProps = ({ Profiles }) => ({
//     Profiles
// });

const mapDispatchToProps = dispatch => ({
    // loadProfile: bindActionCreators(loadProfile, dispatch)
    loadProfile
});

export default connect(null, mapDispatchToProps)(Profile);