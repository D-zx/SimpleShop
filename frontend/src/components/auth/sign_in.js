import React from "react"
import { 
	FormControlLabel, 
	TextField, 
	Typography, 
	Checkbox, 
	Button,
	Box, 
	CircularProgress, 
} from '@mui/material';

import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { signIn } from '../../actions/auth'

import { withTranslation } from 'react-i18next';
import { useStyles } from "../../styles/dialog";

const SignIn = ({signIn, errors, loading, t}) => {
	const classes= useStyles()
	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
			image: null,
			remember: false,
		},
		onSubmit: values => {
			signIn(values)
		  },
	});

	const {
    values,
    handleChange,
	handleSubmit,
  	} = formik;

	return (
		
		<form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
			<Typography color='error' align='center' variant='subtitle1'>{errors.invalid}</Typography>
			<TextField 
				type="text"
				variant="outlined" 
				margin="normal" 
				required 
				fullWidth 
				id="username" 
				label={t("auth.form.username")}
				name="username" 
				value={values.username}
				onChange={handleChange}
				error={!!errors.username}
				helperText={errors.username}
			/>

			<TextField 
				type="password"
				variant="outlined" 
				margin="normal" 
				required 
				fullWidth 
				autoComplete="password"
				id="password" 
				label={t("auth.form.password")} 
				name="password" 
				value={values.password}
				onChange={handleChange}
				error={!!errors.password}
				helperText={errors.password}
			/>
	
			<FormControlLabel
				control={
					<Checkbox
						checked={values.remember}
						id="remember"
						name="remember"
						onChange={handleChange}
						
					/>
					}
				label={t("auth.remember")}
				className={`${classes.form} ${classes.remember}`}
			/>
			<Box>
				<Button type="submit" variant="outlined" color='primary' className={classes.button}  endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
					{t("auth.sign-in")}
				</Button>
			</Box>
		</form>
	);
}

const mapStateToProps = state => ({
	errors: state.auth.signin_err || {},
	loading: state.auth.loading,
});
export default connect(mapStateToProps, { signIn })(withTranslation()(SignIn));