import React, { useState } from 'react';
import {
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
	CircularProgress, 
  Grid, 
  ImageList,
  ImageListItem,
  ImageListItemBar
 } from '@mui/material';

import { useStyles } from '../../styles/admin'

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from "react-router";
import { createImage } from '../../actions/admin/image';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const UploadImage = ({status, loading,err, createImage}) => {
  const classes = useStyles();
  let params = useParams();

  const { t } = useTranslation()

  const [show, setShow] = useState(false);
  
  const [images, setImages] = useState([])
  
  const uploadImage = (e) => {
    let files = Object.values(e.target.files)
    files.map((file)=>{
      return setImages(arr=>[...arr,{'name': file.name, 'image': URL.createObjectURL(file),file: file, status: 'waiting'}])
    })
  }

  const handleSubmit = () => {
    images.map((image, index)=>{
      if(image.status==='waiting'){
        createImage(image.file, params['productID'], params['shopID'])
        .then((res)=>{
          images[index].status = res
          setImages(arr=>[...arr])
        })
      }
      return(image)
    })
  }

  const handleClose = () => {
    setShow(false);
  }
  
  const handleShow = () => {
      setShow(true)
    };

 
  return (
    <div>
      <Button variant="outlined"  onClick={handleShow} startIcon={<FontAwesomeIcon icon="images" size="sm"/>}>
        {t('product.addImages')}
      </Button>
      <Dialog open={show} onClose={handleClose} TransitionComponent={Transition} maxWidth="sm" fullWidth={true} PaperProps={{style: {borderRadius: "10px", textAlign: "center"}}}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon='times-circle' size="sm"/>
        </IconButton>
        <DialogTitle className={classes.title}>
            <FontAwesomeIcon icon='images'  size='2x' className={classes.dialogIcon}/>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container item justifyContent='center'>
            <label htmlFor="image" >
              <Button component="span" variant="outlined" className={classes.button} startIcon={<FontAwesomeIcon icon="images" size="sm"/>}>{t("product.selectImages")}</Button>
              <input className={classes.imageInput} hidden type="file" multiple id="image" name="images" accept="image/*" onChange={e => uploadImage(e)}></input>
            </label>
          </Grid>
          {images.length > 0 && (
              <Grid container item justifyContent='center'>
                <ImageList  cols={3}  rowHeight={164}>
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
                      <ImageListItemBar
                        title={item.name}
                        subtitle={item.status}
                        
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>)}
              <Button type="submit" variant="outlined" onClick={handleSubmit} color='primary' className={classes.button} fullWidth endIcon={loading&&<CircularProgress color="inherit" size={20} />} >
                {t("product.upload")}
              </Button>
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

export default connect(mapStateToProps, {createImage})(UploadImage);