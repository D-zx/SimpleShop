import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from "axios";
import ResetPassword from '../../components/auth/reset_password'
import SignIn from '../../components/auth/sign_in'
import { resetPasswordConfirm } from '../../actions/password'
import { useFormik } from 'formik';
import {connect} from 'react-redux';
import { useStyles } from "../../styles/dialog";
import { useTranslation } from 'react-i18next';

import {Box, CardHeader, TextField, Button, CircularProgress, CardContent, Paper } from '@mui/material';

const PasswordResetConfirm = ({resetPasswordConfirm, loading, errors, tabindex}) => {
  let params = useParams();
  const [index, setIndex] = useState();
  const classes = useStyles()
  const { t } = useTranslation()


  const formik = useFormik({
		initialValues: {
			password: '',
			password2: '',
		},
		onSubmit: values => {
			resetPasswordConfirm(values, params)
		  },
	});

	const {
    values,
    handleChange,
	  handleSubmit,
  	} = formik;

  useEffect(()=>{
    const checkToken =() =>{
      const baseURL = process.env.REACT_APP_API_URL
      const url = baseURL + `account/reset-password-confirmation/${params['uuid']}/${params['token']}/` 
      axios.get(url)
      .then(function (res) {
        setIndex("valid")
      })
      .catch(function (err) {
        setIndex("invalid")
      });
    };
    checkToken();
  },[params])
  

  useEffect(()=>{
    if(tabindex === "password-reset-mail-sent"){
      setIndex('re-send')
    }
    if(tabindex === "reset-success"){
      setIndex('reset-success')
    }
  },[tabindex])

  const Content = () => {

    switch(index){
      case "invalid":
        return(
        <Box>
          <CardHeader
            title={t("password.confirm.invalid.title")}  
            subheader={t("password.confirm.invalid.subheader")}  
          />
          <CardContent>
            <ResetPassword resend={true}/>
          </CardContent>
        </Box>
        )

      case "valid":
        return(
        <Box>
          <CardHeader
            title={t("password.confirm.valid.title")} 
            subheader={t("password.confirm.valid.subheader")} 
          />
          <CardContent>
          <form onSubmit={handleSubmit}  className={classes.form} autoComplete="off">
            <TextField 
              type="password"
              variant="outlined" 
              margin="normal" 
              required 
              fullWidth 
              id="password" 
              label={t("auth.form.password")}  
              name="password" 
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField 
              type="password"
              variant="outlined" 
              margin="normal" 
              required 
              fullWidth 
              id="password2" 
              label={t("auth.form.password2")} 
              name="password2" 
              value={values.password2}
              onChange={handleChange}
              error={!!errors.password2}
              helperText={errors.password2}
            />
            <Box>
              <Button type="submit" variant="outlined" color="primary" className={classes.button} endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
              Reset Password
              </Button>
            </Box>
          </form>
          </CardContent>
        </Box>
        )

      case "reset-success":
        return(
        <Box maxWidth={500} p={3}>
          <CardHeader
            title={t("password.confirm.success.title")} 
            subheader={t("password.confirm.success.subheader")}
          />
          <CardContent>
            <SignIn/>
          </CardContent>
        </Box>
        )
      default:
        return(<div></div>)  
    }
  }
  
  return (
    <Box display="flex" justifyContent="center" >
      <Paper style={{borderRadius: "10px", textAlign: "center"}}>
        {Content()}
      </Paper>
    </Box>
    );
}
const mapStateToProps = state => ({
	tabindex: state.password.tabindex,
  email: state.auth.email || "", 
  errors: state.auth.rpc_err || {},
  loading: state.auth.loading
});

export default connect(mapStateToProps, {resetPasswordConfirm})(PasswordResetConfirm);