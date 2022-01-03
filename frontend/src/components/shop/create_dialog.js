import React, { useEffect, useState } from 'react';
import {
  Box,
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
	TextField, 
	CircularProgress, 
 } from '@mui/material';

import { useStyles } from '../../styles/admin'

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik';
import { createShop } from '../../actions/admin/shop';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const CreateDialog = ({status, loading,err, createShop}) => {
  const classes = useStyles();

  const { t } = useTranslation()

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  
  const handleShow = () => {
      setShow(true)
    };


  

  const init= {
    name: '',
    phone: '',
    address: '',
  }
  const formik = useFormik({
    initialValues: init,
    enableReinitialize: true,
    onSubmit: values => {
        createShop(values)
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
          phone: '',
          address: '',
        })
      }
  },[status, setValues])

  useEffect(()=>{
    setErrors(err)
  },[err, setErrors])

  return (
    <div>
      <Button variant="outlined"  onClick={handleShow}>
        {t('shop.create')}
      </Button>
      <Dialog open={show} onClose={handleClose} TransitionComponent={Transition} maxWidth="xs" fullWidth={true} PaperProps={{style: {borderRadius: "10px", textAlign: "center"}}}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon='times-circle' size="sm"/>
        </IconButton>
        <DialogTitle className={classes.title}>
            <FontAwesomeIcon icon='store'  className={classes.icon}/>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
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
              variant="outlined" 
              margin="normal" 
              multiline
              minRows={3}
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
              <Button type="submit" variant="outlined" color='primary' className={classes.button}  endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
                {t("shop.create")}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => ({
  status: state.admin.shop.status,
  loading: state.loading,
  err: state.admin.shop.err
});

export default connect(mapStateToProps, {createShop})(CreateDialog);