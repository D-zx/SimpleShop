import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';

import {
    TextField,
    Box,
	  Typography,
    Button,
    CircularProgress,
    Grid,
} from '@mui/material';

import axios from "axios";
import { useTranslation } from "react-i18next";
import { useStyles } from '../../../styles/admin'
import { updateBrand } from "../../../actions/admin/brand";
import { useFormik } from "formik";
import { useParams } from "react-router";

const Brand = ({token, loading, err, updateBrand}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    let params = useParams();
    const [url, setUrl] = useState('')

    const formik = useFormik({
        initialValues: {
          name: '',
        },
        onSubmit: values => {
            updateBrand(url,values)
          },
      });
    
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setErrors,
        setValues,
        } = formik;

    useEffect(()=>{
        const getBrandData = ()=>{
        	  const baseURL = process.env.REACT_APP_API_URL
            const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
        	}
			axios.get(baseURL+`shops/${params['shopID']}/brands/${params['brandID']}/`, config)
			.then((res)=>{
				        setValues(res.data)
                setUrl(res.config.url)
			})
			.catch((err)=>{
				console.log(err)
			})
        }  
        getBrandData()
    },[setValues,token, params])

    useEffect(()=>{
       setErrors(err)
    },[err, setErrors])

    return (
        <Grid container>
          <Grid container item justifyContent='left' sm={12} md={7}>
            <Box Container className={classes.detail}>
              <Typography variant="h4" className={classes.title}>{t("brand.detail")}</Typography>
              <form onSubmit={handleSubmit} autoComplete="off">
                <TextField 
                  type="text"
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="name" 
                  label={t("brand.name")}
                  name="name" 
                  value={values.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                
                <Button type="submit" variant="outlined" color='primary' className={classes.button} fullWidth endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
                  {t("brand.update")}
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
    )
}
const mapStateToProps = state => ({
    token: state.auth.token,
    err: state.admin.brand.err,
});

export default connect(mapStateToProps, {updateBrand})(Brand);