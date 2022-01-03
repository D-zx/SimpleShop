import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';

import {
    TextField,
    Box,
	  Typography,
    Button,
    CircularProgress,
    Grid,
    ImageList,
    ImageListItem, 
    ImageListItemBar
} from '@mui/material';

import axios from "axios";
import { useTranslation } from "react-i18next";
import { useStyles } from '../../../styles/admin'
import { updateProduct } from "../../../actions/admin/product";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Brands from '../../../components/product/brands'
import Categories from '../../../components/product/categories'
import UploadImage from '../../../components/product/upload_images'
import { deleteImage } from '../../../actions/admin/image'

const Product = ({token, loading, err, reload, deleted, updateProduct, deleteImage}) => {
    let params = useParams();
    const classes = useStyles();
    const {t} = useTranslation();
    const [url, setUrl] = useState('')

    const formik = useFormik({
        initialValues: {
          name: '',
          brand: 0,
          categories: [],
          stock: 0,
          price: '0',
          description: '',
          images: [],
        },
        onSubmit: values => {
            updateProduct(url, values)
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
    
    const [images, setImages] = useState([])

    useEffect(()=>{
        const getProductData = ()=>{
          const baseURL = process.env.REACT_APP_API_URL
          const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
        	}
          axios.get(baseURL+`shops/${params['shopID']}/products/${params['productID']}/`, config)
          .then((res)=>{
                    setValues(res.data)
                    setUrl(res.config.url)
                    setImages(res.data.images)
          })
          .catch((err)=>{
            console.log(err)
          })
          }  
        getProductData()
    },[setValues, params, token, reload, deleted])

    useEffect(()=>{
       setErrors(err)
    },[err, setErrors])

    const handleDelete = (url) => {
      deleteImage(url)
    }

    return (
        <Grid container direction={{xs:'column-reverse', lg:'row'}}>
          
          <Grid container item justifyContent='center' sm={12} md={6}>
            <Box Container className={classes.detail}>
              <Typography variant="h4" className={classes.title}>{t("product.detail")}</Typography>
              <form onSubmit={handleSubmit} autoComplete="off">
                <TextField 
                  type="text"
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="name" 
                  label={t("product.name")}
                  name="name" 
                  value={values.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <Brands handleChange={handleChange} value={values.brand}/>
                <Categories handleChange={handleChange} value={values.categories}/>
                
                <TextField 
                  type="Number"
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="stock" 
                  label={t("product.stock")}
                  name="stock" 
                  value={values.stock}
                  onChange={handleChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                />
                <TextField 
                  type="number"
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="price" 
                  label={t("product.price")}
                  name="price" 
                  value={values.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                />
                <TextField 
                  multiline
                  minRows={3}
                  type="number"
                  variant="outlined" 
                  margin="normal" 
                  fullWidth 
                  id="description" 
                  label={t("product.description")}
                  name="description" 
                  value={values.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
                <Button type="submit" variant="outlined" color='primary' className={classes.button} fullWidth endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
                  {t("product.update")}
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid container item sm={12} md={6} direction='column'>

            <Grid container item justifyContent='center'>
              <UploadImage/>
              
            </Grid>
            {images.length > 0 && (
            <Grid container item justifyContent='center'>
              <ImageList  cols={3} rowHeight={164}>
                {images.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${item.image}`}
                      srcSet={`${item.image}`}
                      className={classes.image}
                      alt="{item.name}"
                      loading="lazy"
                      onClick={()=>console.log(index)}
                    />
                    <ImageListItemBar
                        title={item.name}
                        actionPosition='right'
                        actionIcon={
                          <FontAwesomeIcon icon="trash"  className={classes.deleteIcon} onClick={()=>handleDelete(item.url)}/>
                        }
                      />
                  </ImageListItem>
                ))}
                
              </ImageList>
            </Grid>)}
          </Grid>
        </Grid>
    )
}
const mapStateToProps = state => ({
    token: state.auth.token,
    err: state.admin.product.err,
    reload: state.admin.image.reload,
    deleted: state.admin.image.status
});

export default connect(mapStateToProps, {updateProduct, deleteImage})(Product);