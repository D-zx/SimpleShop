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
 } from '@mui/material';

import { useStyles } from '../../styles/admin'

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik';
import { createCategory } from '../../actions/admin/category';
import { useParams } from "react-router";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const CreateDialog = ({status, loading,err, createCategory}) => {
  const classes = useStyles();
  let params = useParams();

  const { t } = useTranslation()

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  
  const handleShow = () => {
      setShow(true)
    };

  const init= {
    name: '',
    shop: params['shopID'],
  }
  const formik = useFormik({
    initialValues: init,
    enableReinitialize: true,
    onSubmit: values => {
        values['shop'] = params['shopID']
        createCategory(values, params['shopID'])
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
        })
      }
  },[status, setValues])

  useEffect(()=>{
    setErrors(err)
  },[err, setErrors])

  return (
    <div>
      <Button variant="outlined"  onClick={handleShow}>
        {t('category.create')}
      </Button>
      <Dialog open={show} onClose={handleClose} TransitionComponent={Transition} maxWidth="xs" fullWidth={true} PaperProps={{style: {borderRadius: "10px", textAlign: "center"}}}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon='times-circle' size="sm"/>
        </IconButton>
        <DialogTitle className={classes.title}>
            <FontAwesomeIcon icon='th-list' size='2x'  className={classes.dialogIcon}/>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
            <TextField 
              type="text"
              variant="outlined" 
              margin="normal" 
              fullWidth 
              id="name" 
              label={t("category.name")}
              name="name" 
              value={values.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <Button type="submit" variant="outlined" color='primary' className={classes.dialogButton}  endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
              {t("category.create")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => ({
  status: state.admin.category.status,
  loading: state.loading,
  err: state.admin.category.err
});

export default connect(mapStateToProps, {createCategory})(CreateDialog);