import React, { useEffect, useState } from 'react';
import {
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
	TextField, 
	CircularProgress, 
  Grid, 
  ImageList,
  ImageListItem,
 } from '@mui/material';

import { useStyles } from '../../styles/admin'

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik';
import { createProduct } from '../../actions/admin/product';
import { useParams } from "react-router";
import Brands from './brands'
import Categories from './categories'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const CreateDialog = ({status, loading,err, createProduct}) => {
  const classes = useStyles();
  let params = useParams();

  const { t } = useTranslation()

  const [show, setShow] = useState(false);
  
  const [images, setImages] = useState([])
  const [files, setFiles] = useState()
  
  const uploadImage = (e) => {
    let files = Object.values(e.target.files)
    setFiles(files)
    files.map((file)=>{
      return setImages(arr=>[...arr,{'name': file.name, 'image': URL.createObjectURL(file)}])
    })
  }

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
      setShow(true)
    };


 
  const init= {
    name: '',
    shop: params['shopID'],
    brand: 0,
    categories: [],
    stock: 0,
    price: '0',
    description: '',
    images: [],
  }
  const formik = useFormik({
    initialValues: init,
    enableReinitialize: true,
    onSubmit: values => {
        values['shop'] = params['shopID']
        createProduct(values, params['shopID'], files)
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
      setShow(false)
      if(status==='created'){
        setValues({
          name: '',
          brand: 0,
          categories: [],
          stock: 0,
          price: '0',
          description: '',
          images: [],
        })
      }
  },[status, setValues])

  useEffect(()=>{
    setErrors(err)
  },[err, setErrors])


  return (
    <div>
      <Button variant="outlined"  onClick={handleShow}>
        {t('product.create')}
      </Button>
      <Dialog open={show} onClose={handleClose} TransitionComponent={Transition} maxWidth="sm" fullWidth={true} PaperProps={{style: {borderRadius: "10px", textAlign: "center"}}}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon='times-circle' size="sm"/>
        </IconButton>
        <DialogTitle className={classes.title}>
            <FontAwesomeIcon icon='cube'  size='2x' className={classes.dialogIcon}/>
        </DialogTitle>
        <DialogContent className={classes.content}>
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
                  minRows={1}
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

                <Grid container  direction='column'>
                  <Grid container item justifyContent='center'>
                    <label htmlFor="image" >
                      <Button component="span" variant="outlined" className={classes.button} startIcon={<FontAwesomeIcon icon="images" size="sm"/>}>{t("product.addImages")}</Button>
                      <input className={classes.imageInput} hidden type="file" multiple id="image" name="images" accept="image/*" onChange={e => uploadImage(e)}></input>
                    </label>
                  </Grid>
                  {images.length > 0 && (
                  <Grid container item justifyContent='center'>
                    <ImageList  cols={3}  >
                      {images.map((item, index) => (
                        <ImageListItem key={index}>
                          <img
                            className={classes.images}
                            src={item.image}
                            srcSet={item.image}
                            alt={item.name}
                            loading="lazy"
                            onClick={()=>console.log(index)}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>)}
                </Grid>
                <Button type="submit" variant="outlined" color='primary' className={classes.button} fullWidth endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
                  {t("product.create")}
                </Button>
              </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => ({
  status: state.admin.product.status,
  loading: state.loading,
  err: state.admin.product.err
});

export default connect(mapStateToProps, {createProduct})(CreateDialog);