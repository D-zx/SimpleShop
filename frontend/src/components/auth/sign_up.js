import React, {useState} from "react"
import { 
	Box,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button, 
	CircularProgress
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { signUp } from '../../actions/auth';
import {connect} from 'react-redux';

import { withTranslation } from 'react-i18next';
import { useStyles } from "../../styles/dialog";

const SignUpStep = (props) => {
	const { children, value, index } = props;
	
	return (
	  <div
		hidden={value !== index}
		id={`sign_up-${index}`}
	  >
		{value === index && (
		  <Box>
			{children}
		  </Box>
		)}
	  </div>
	);
};



const SignUp = ({signUp, loading,  t}) => {
	const classes = useStyles();

	const SignupSchema = Yup.object().shape({
		username: Yup.string().min(3, 'Too Short!').max(10, 'Too Long!').required('Required'),
		password: Yup.string().min(8, 'Too Short!').max(15, 'Too Long!').required('Required'),
		password2: Yup.string().min(8, 'Too Short!').max(15, 'Too Long!').oneOf([Yup.ref('password'), null], "Passwords don't match!").required('Required'),
	})

	const DetailSchema = Yup.object().shape({
		email: Yup.string().email().required('Required'),
		first_name: Yup.string().required('Required'),
		last_name: Yup.string().required('Required'),
		gender: Yup.string().required('Required'),
		phone: Yup.number().typeError('Invalid Input'),
	})

	const [schema, setSchema] = useState(SignupSchema);

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
			password2: '',
			email: '',
			first_name: '',
			last_name: '',
			gender: '',
			phone: '',
		},
		validationSchema: schema,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: values => {
			signUp(values)
		  },
	});

	const {
		values,
		errors,
		handleSubmit,
		handleChange,
		validateForm,
  	} = formik;

	const [key, setKey]= useState("user")

	const handleContinute = () => {
		validateForm().then((e)=> {
			if(Object.keys(e).length===0){
				setSchema(DetailSchema)
				setKey("detail")
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<SignUpStep value={key} index={"user"}>
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
					onBlur={formik.handleBlur}
					error={!!errors.password}
					helperText={errors.password}
				/>

				<TextField 
					type="password"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					autoComplete="password"
					id="password2" 
					label={t("auth.form.password2")}
					name="password2" 
					value={values.password2}
					onChange={handleChange}
					error={!!errors.password2}
					helperText={errors.password2}
				/>
				<Button variant="outlined" color="primary" onClick={handleContinute} endIcon={loading&&<CircularProgress color="inherit" size={20} />} className={classes.button}>
					{t("auth.continute")}
				</Button>
			</SignUpStep>
			<SignUpStep value={key} index={"detail"}>
				<TextField 
					type="email"
					variant="outlined" 
					margin="normal" 
					required 
					fullWidth 
					id="email" 
					label={t("auth.form.email")}
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
					id="first_name" 
					label={t("auth.form.firstname")}
					name="first_name" 
					value={values.first_name}
					onChange={handleChange}
					error={!!errors.first_name}
					helperText={errors.first_name}
				/>

				<TextField 
					type="text"
					variant="outlined" 
					margin="normal" 
					fullWidth 
					id="last_name" 
					label={t("auth.form.lastname")}
					name="last_name" 
					value={values.last_name}
					onChange={handleChange}
					error={!!errors.last_name}
					helperText={errors.last_name}
				/>
				<FormControl variant="outlined" fullWidth margin="normal" style={{textAlign: "left"}}>
        			<InputLabel htmlFor="gender">{t("auth.form.gender")}</InputLabel>
					<Select 
						value={values.gender} 
						onChange={handleChange} 
						label={t("auth.form.gender")}
						inputProps={{
							name: 'gender',
							id: 'gender',
						  }}
						MenuProps={{
							getContentAnchorEl:   null,
							anchorOrigin: {vertical: "bottom", horizontal: "left"} ,
							transformOrigin: {vertical: "top", horizontal: "left" },
							}}
						>
						<MenuItem value={"male"}>{t("auth.form.male")}</MenuItem>
						<MenuItem value={"female"}>{t("auth.form.female")}</MenuItem>
						<MenuItem value={"other"}>{t("auth.form.other")}</MenuItem>
					</Select>
				</FormControl>
				<TextField 
					type="tel"
					variant="outlined" 
					margin="normal" 
					fullWidth 
					id="last_name" 
					label={t("auth.form.phone")}
					name="phone" 
					value={values.phone}
					onChange={handleChange}
					error={!!errors.phone}
					helperText={errors.phone}
				/>
				<Button variant="outlined"  onClick={handleSubmit} color="primary" endIcon={loading&&<CircularProgress color="inherit" size={20} />} className={classes.button}>
					{t("auth.sign-up")}
				</Button>
				
			</SignUpStep>
		</form>
	);
};

const mapStateToProps = state => ({
	loading: state.auth.loading,
	errors: state.auth.signup_err || {}
});

export default connect(mapStateToProps, { signUp })(withTranslation()(SignUp));