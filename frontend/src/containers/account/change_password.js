import React, { useEffect }  from "react"
import { useFormik } from 'formik';
import {connect} from 'react-redux';
import {changePassword} from '../../actions/password'
import { Redirect } from 'react-router-dom';

import { Box, CardHeader, TextField, Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStyles } from "../../styles/dialog";


const ChangePassword = ({changePassword, err, isAuthenticated, redirect, loading}) => {
    const { t } = useTranslation()
    const classes = useStyles()
	const formik = useFormik({
		initialValues: {
			current_password: '',
			password: '',
			password2: '',
		},
		onSubmit: values => {
			changePassword(values)
		  },
	});

	const {
    values,
    errors,
    handleChange,
	handleSubmit,
    setErrors,
  	} = formik;
    
    useEffect(()=>{
        setErrors(err)
    },[err])

	if (redirect){
		return <Redirect to='/' />;
	}

	if (!isAuthenticated){
		return <Redirect to='/' />;
	}
    
	return (
		<Box display='flex' justifyContent="center">
            <Box style={{borderRadius: "10px", textAlign: "center",}}>
                <CardHeader
                    title={t("password.change.title")} 
                    subheader={t("password.change.subheader")} 
                />
                <Box maxWidth={500} p={3}>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextField 
                        type="password"
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        id="old_password" 
                        label={t("auth.form.oldPassword")} 
                        name="current_password" 
                        value={values.current_password}
                        onChange={handleChange}
                        error={!!errors.current_password}
                        helperText={errors.current_password}
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
                        <Button variant="outlined" type="submit" color="primary" endIcon={loading&&<CircularProgress color="inherit" size={20} />} className={classes.button}>
                            {t("auth.changePassword")}
                        </Button>
                    </form>
                </Box>
            </Box>
		</Box>

	);
}

const mapStateToProps = state => ({
  err: state.password.changepassword_error || {},
  isAuthenticated : state.auth.isAuthenticated,
  redirect : state.auth.redirectTo,
  loading: state.auth.loading
});

export default connect(mapStateToProps, {changePassword})(ChangePassword);