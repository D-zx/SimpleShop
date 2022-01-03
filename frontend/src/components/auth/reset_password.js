import React, {useState, useEffect}  from "react";
import {
	TextField,
	CircularProgress,
	Button, 
	Link,
	Box, 
	DialogContent, 
	DialogTitle, 
	DialogContentText,
	Typography,
   } from '@mui/material';

import { useFormik } from 'formik';
import {connect} from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';

import { resetPassword } from '../../actions/password';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyles } from '../../styles/dialog';

const TabPanel = (props) => {
	const { children, value, index } = props;
	return (
	  <div
		hidden={value !== index}
		id={`tabpanel-${index}`}
	  >
		{value === index && (
		  <Box p={3}>
			{children}
		  </Box>
		)}
	  </div>
	);
  };

  const ResetPassword = ({resetPassword, errors, loading, mailsent,  setIndex}) => {
	const classes = useStyles();
	const { t } = useTranslation()

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: values => {
			resetPassword(values)
		  },
	});

	const resend = () => {
		resetPassword(formik.values)
	}

	const {
		values,
		handleChange,
		handleSubmit,
		} = formik;

	const [key, setKey] = useState(0);

	useEffect(()=>{
		if (mailsent){
			setKey(1)
		}
	  }, [mailsent])

	return (
		<div>
			<TabPanel value={key} index={0} >
				<DialogTitle className={classes.title}>
					<FontAwesomeIcon icon='key' size="2x" className={classes.icon}/>
				</DialogTitle>
				<DialogContent className={classes.content}>
					<Typography>{t('auth.forget')}</Typography>
					<form onSubmit={handleSubmit} className="passwordreset_form">
						<TextField 
							type="email"
							variant="outlined" 
							margin="normal" 
							required 
							fullWidth 
							id="email" 
							label="E-mail Address" 
							name="email" 
							value={values.email}
							onChange={handleChange}
							error={!!errors.email}
							helperText={errors.email}
						/>
						<Button type="submit" variant="outlined" color="secondary" className={classes.button} endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
							{t("auth.reset-password")}
						</Button>
					</form>
				</DialogContent>
			</TabPanel>
			<TabPanel value={key} index={1} >
				<Box p={2}>
					<DialogTitle className={classes.title}>
						<FontAwesomeIcon icon='paper-plane' size="2x"  className={classes.icon}/>
					</DialogTitle>
					<DialogContent className={classes.content}>
						<DialogContentText>
							{t("auth.email_sent")} <b>{formik.values.email}</b>
						</DialogContentText>
						<DialogContentText>
							<Trans i18nKey="auth.resend">
								To resend, click <Link href="#" onClick={()=>resend()}></Link>
							</Trans>
						</DialogContentText>

					</DialogContent>
				</Box>
			</TabPanel>
		</div>
	);
};

const mapStateToProps = state => ({
	errors: state.password.resetpassword_error || {},
	loadings: state.password.loading,
	mailsent: state.password.mailsent
});

export default connect(mapStateToProps, {resetPassword})(ResetPassword);