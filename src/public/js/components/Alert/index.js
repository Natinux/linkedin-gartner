import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions';

const mapStateToProps = ({ Alerts }) => ({
    Alerts
});

const mapDispatchToProps = dispatch => ({
    removeAlert: alertId => dispatch(removeAlert(alertId))
});

class Alert extends Component {

    onCloseClick(alertId){
        const { removeAlert } = this.props;
        removeAlert(alertId);
    }

    render(){

        const { Alerts: alerts } = this.props;

        return (
            <div>
                {
                    (alerts || []).map(alert => {
                        return (
                            <div key={alert.id} className="alert alert-danger" role="alert">
                                {alert.message}
                                <i className="fa fa-times close" onClick={() => this.onCloseClick(alert.id)}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
