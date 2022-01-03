import React, { useEffect } from "react"
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
import { deliveryAddress } from "../../actions/order";

const Address = ({setStep, address, deliveryAddress}) => {
	const classes= useStyles()
    const { t } = useTranslation()
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			phone: '',
			address: '',
			city: '',
			zip: '',
			country: '',
			radio: ''
		},
		onSubmit: values => {
			deliveryAddress(values)
			setStep(1)
		  },
	});

	const {
        values,
        handleChange,
        handleSubmit,
		setValues,
		errors
  	    } = formik;

		  
	useEffect(()=>{
		if(address){
			setValues(address)
		}
	},[address])

	return (
		<Box p={2} width="sm" >
			<Typography variant='h5'>{t("shipping.info")}</Typography>
			<FormControl component="fieldset">
					<FormLabel component="legend">{t("shipping.gender")}</FormLabel>
					<RadioGroup
						aria-label={t("shipping.gender")}
						name="radio"
						value={values.radio}
						onChange={handleChange}
					>
						<FormControlLabel value="male" control={<Radio />} label={t("shipping.male")} />
						<FormControlLabel value="female" control={<Radio />} label={t("shipping.female")} />
					</RadioGroup>
				</FormControl>

			<form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
				<TextField 
					type="text"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="name" 
					label={t("shipping.name")}
					name="name" 
					value={values.name}
					onChange={handleChange}
					error={!!errors.name}
					helperText={errors.name}
				/>
				<TextField 
					type="email"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="email" 
					label={t("shipping.email")}
					name="email" 
					value={values.email}
					onChange={handleChange}
					error={!!errors.email}
					helperText={errors.email}
				/>
				<TextField 
					type="text"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="phone" 
					label={t("shipping.phone")}
					name="phone" 
					value={values.phone}
					onChange={handleChange}
					error={!!errors.phone}
					helperText={errors.phone}
				/>
				
				<TextField 
					type="text"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="address" 
					label={t("shipping.address")}
					name="address" 
					value={values.address}
					onChange={handleChange}
					error={!!errors.address}
					helperText={errors.address}
				/>
				<TextField 
					type="text"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="city" 
					label={t("shipping.city")}
					name="city" 
					value={values.city}
					onChange={handleChange}
					error={!!errors.city}
					helperText={errors.city}
				/>
				<TextField 
					type="text"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="zip" 
					label={t("shipping.zip")}
					name="zip" 
					value={values.zip}
					onChange={handleChange}
					error={!!errors.zip}
					helperText={errors.zip}
				/>
				<TextField 
					type="text"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="country" 
					label={t("shipping.country")}
					name="country" 
					value={values.country}
					onChange={handleChange}
					error={!!errors.country}
					helperText={errors.country}
				/>
				
				
				<Box>
					<Button type="submit" variant="outlined" color='primary' className={classes.button}  >
						{t("shipping.save")}
					</Button>
				</Box>
			</form>
		</Box>
	);
}

const mapStateToProps = state => ({
	address: state.order.address,

});
export default connect( mapStateToProps, {deliveryAddress} )(Address);