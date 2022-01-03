import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import {
    Box,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography
} from '@mui/material';

import { useTranslation } from "react-i18next";
import { useStyles } from "../styles/check_out";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Shipping from "../components/check_out/shipping";
import Payment from "../components/check_out/payment";
import Confirmation from "../components/check_out/confirmation";

const steps = ['Delivery Address', 'Choice payment', 'Confirm your order'];
const CheckOut = ({isAuthenticated}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const Content = () => {
        switch (activeStep) {
            case 0:
                return( <Shipping setStep={setActiveStep} /> )
            
            case 1:
                return( <Payment setStep={setActiveStep} /> )
        
            case 2:
                return( <Confirmation /> )

            default:
                return( <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 2}</Typography> )
        }
    }

    if (!isAuthenticated){
		return <Redirect to='/' />;
	}

	return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                
                return (
                <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
                );
            })}
            </Stepper>
            {activeStep === steps.length ? (
            <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                </Box>
            </React.Fragment>
            ) : (
            <React.Fragment>
                <Content/>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext}>
                        {activeStep !== steps.length - 1 && 'Next'}
                    </Button>
                </Box>
            </React.Fragment>
            )}
      </Box>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(CheckOut);