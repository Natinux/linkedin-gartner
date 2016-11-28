import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addProfile } from '../../actions';
import User from './presenter';

function mapDispatchToProps(dispatch) {
    return {
        onAddProfile: bindActionCreators(addProfile, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(User);