import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Alert } from '@mui/material';
import { useStyles } from '../styles/alert'

const Alerts = ({ alerts }) => {
    const classes = useStyles();

    return (
        <div className={classes.alert}>
            {alerts!== null && alerts.length >0 && alerts.map((alert, index)=>(
                <div key={alert.id} className={classes.alertMessage}>
                    <Alert severity={alert.alertType}>{alert.msg}</Alert>
                </div>
            )) }
        </div>
    )
}


Alerts.prototype = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);