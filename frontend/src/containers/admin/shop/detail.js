import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';

import {
    TextField,
    Box,
	  Typography,
    Button,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Link,
} from '@mui/material';

import axios from "axios";
import { useTranslation } from "react-i18next";
import { useStyles } from '../../../styles/admin'
import { updateShop } from "../../../actions/admin/shop";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from "react-router";

const Shop = ({token, loading, err, updateShop}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    let params = useParams();
    const [url, setUrl] = useState('')

    const formik = useFormik({
        initialValues: {
          name: '',
          phone: '',
          address: '',
        },
        onSubmit: values => {
            updateShop(url,values)
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
        const getShopData = ()=>{
      	  const baseURL = process.env.REACT_APP_API_URL

            const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
        	}
          axios.get(baseURL+`shops/${params['shopID']}/`, config)
          .then((res)=>{
            setValues(res.data)
                    setUrl(res.data.url)
          })
          .catch((err)=>{
            console.log(err)
          })
        }  
        getShopData()
    },[setValues, params, token])

    useEffect(()=>{
       setErrors(err)
    },[err, setErrors])

    const path = useLocation().pathname;
    console.log(path)
    return (
        <Grid container>
          <Grid container item justifyContent='center' sm={12} md={5}>
            <Box Container className={classes.detail}>
              <Typography variant="h4" className={classes.title}>{t("shop.detail")}</Typography>
              <form onSubmit={handleSubmit} autoComplete="off">
                <TextField 
                  type="text"
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="username" 
                  label={t("shop.name")}
                  name="name" 
                  value={values.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField 
                  type="tel"
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="username" 
                  label={t("shop.phone")}
                  name="phone" 
                  value={values.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
                <TextField 
                  type="text"
                  multiline
                  minRows={3}
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="username" 
                  label={t("shop.address")}
                  name="address" 
                  value={values.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
                <Box>
                  <Button type="submit" variant="outlined" color='primary' className={classes.button} fullWidth endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
                    {t("shop.update")}
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid container item justifyContent='center' sm md={3}>
            <Box className={classes.links}>
              <List dense >
                <ListItem component={Link} href={path+"/brand"}>
                  <ListItemButton divider>
                    <ListItemIcon>
                      <FontAwesomeIcon icon='copyright' size="lg"  className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Brands" />
                  </ListItemButton>
                </ListItem>
                <ListItem component={Link} href={path+"/category"} >
                  <ListItemButton divider>
                    <ListItemIcon>
                      <FontAwesomeIcon icon='th-list' size="lg"  className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                  </ListItemButton>
                </ListItem>
                <ListItem component={Link} href={path+"/product"}>
                  <ListItemButton divider>
                    <ListItemIcon>
                      <FontAwesomeIcon icon='cube' size="lg"  className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
    )
}
const mapStateToProps = state => ({
    token: state.auth.token,
    err: state.admin.shop.err,
});

export default connect(mapStateToProps, {updateShop})(Shop);