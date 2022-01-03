import React, {useEffect} from "react"
import { 
	FormControlLabel, 
	FormControl, 
	FormLabel, 
	TextField, 
	Typography, 
	Button,
	Box,
	Radio,
	RadioGroup, 
} from '@mui/material';

import { useFormik } from 'formik';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useStyles } from "../../styles/dialog";
import { setPayment } from "../../actions/order";

const Payment = ({setStep, setPayment, payment}) => {
	const classes= useStyles()
    const { t } = useTranslation()
	const formik = useFormik({
		initialValues: {
			method: '',
		},
		onSubmit: values => {
            setPayment(values)
            console.log(values)
		  },
	});

	const {
        values,
        handleChange,
        handleSubmit,
		errors,
        setValues,
  	    } = formik;

    
    useEffect(()=>{
		if(values.method=='cash'){
            {handleSubmit()}
        }
	},[values])
    
    useEffect(()=>{
		if(payment){
			setValues(payment)
		}
	},[payment])

	return (
		<Box p={2} width="sm" >
					<FormLabel component="legend">{t("payment.method")}</FormLabel>
			<Typography variant='h5'>{t("payment.info")}</Typography>
			<FormControl component="fieldset">
					<RadioGroup
						aria-label={t("payment.method")}
						name="method"
						value={values.method}
						onChange={handleChange}
					>
						<FormControlLabel value="cash" control={<Radio />} label={t("payment.cash")} />
						<FormControlLabel value="card" disabled control={<Radio />} label={t("payment.card")} />
						<FormControlLabel value="bank" disabled control={<Radio />} label={t("payment.bank")} />
						<FormControlLabel value="qr" disabled control={<Radio />} label={t("payment.qr")} />
					</RadioGroup>
				</FormControl>
		</Box>
	);
}

const mapStateToProps = state => ({
    payment: state.order.payment

});
export default connect( mapStateToProps, {setPayment} )(Payment);