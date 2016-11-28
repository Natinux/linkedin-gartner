import React from 'react';
import { connect } from 'react-redux';
import Profiles from '../Profiles/presenter';

const mapStateToProps = ({ Profiles }) => ({
    Profiles
});

export default connect(mapStateToProps)(Profiles);