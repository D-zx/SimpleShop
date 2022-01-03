import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';

import {
	Container,
    Typography,
    Grid,
    Box,
    Button,
    Divider,
    TextField,
    Paper,
    ImageList,
    ImageListItem,
    Link
} from '@mui/material';

import { useStyles } from "../../styles/products.js";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCart } from "../../actions/order.js";
import { setAlert } from "../../actions/alert.js";

const ProductDetail = ({addCart, isAuthenticated, setAlert}) => {

    let history = useHistory();
    const classes = useStyles()
    const { t } = useTranslation()
    const [product, setProduct] = useState({})
    const [preview, setPreview] = useState({})
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1)
    let params= useParams()

    useEffect(()=>{
        const getProduct = ()=>{
	        const baseURL = process.env.REACT_APP_API_URL
            const config = {
                params: { name: params['productName'] }
            }
            axios.get(baseURL+`products/${params['productName']}/`, config)
                .then((res)=>{
                    setProduct(res.data)
                    setImages(res.data.images)
                    setPreview(res.data.images[0])
                })
                .catch((err)=>{
                    console.log(err)
                })
            }  
        getProduct()

    },[params])

    const handleClickImage = (image) => {
        setPreview(image)
    }

    const handleChage = (e) => {
        setQuantity(e.target.value)
    }

    const order = () => {
        if(isAuthenticated){
            addCart(product, quantity)
            history.push('/cart')
        }else{
            setAlert('Please sign in to order', 'error')
        }
        
    }

    const addToCart = () => {
        if(isAuthenticated){
            addCart(product, quantity)
        }else{
            setAlert('Please sign in to add to cart', 'error')
        }
    }
    

	return (
        <Container>
            {product &&
            <Grid container spacing={2}>
                <Grid item sm={4}>
                    <Paper sx={{padding: '5px'}}>
                        <Box>
                            {preview &&
                                <img
                                    className={classes.previewImage}
                                    src={preview.image}
                                    srcSet={preview.image}
                                    alt={preview.name}
                                    loading="lazy"
                                />
                            }
                        </Box>
                        <Divider/>
                        <Box>
                        <ImageList  cols={5} rowHeight={50} sx={{padding: '5px'}}>
                        {images.map((item) => (
                            <ImageListItem key={item.id}>
                            <img
                                className={classes.images}
                                src={item.image}
                                srcSet={item.image}
                                alt={item.name}
                                loading="lazy"
                                onClick={()=>{handleClickImage(item)}}
                            />
                            </ImageListItem>
                        ))}
                        </ImageList>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item sm={8}>
                    <Typography gutterBottom variant="h3" component="div">
                        {product.name}
                    </Typography>
                    {product.brand_detail&&
                        <Typography  variant="body1" >
                            Brand: <Link href={`/brands/${product.brand_detail.name}`}>{product.brand_detail.name}</Link>
                        </Typography>
                    }
                    <Divider/>
                    <Box p={2}>
                        <Typography gutterBottom variant="h4" color='red'>
                            {product.price} {t('product.currency')}
                        </Typography>
                        <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0, max: 10 } }} value={quantity} label={t('product.quantity')} onChange={(e)=>handleChage(e)}/>
                    </Box>
                    <Box pl={1}> 
                        <Button variant='outlined' color='success' className={classes.button} onClick={()=>order()} endIcon={<FontAwesomeIcon icon="dollar-sign" size="sm" />}>{t('product.order')}</Button>
                        <Button variant='outlined' color='success' className={classes.button} onClick={()=>addToCart()} endIcon={<FontAwesomeIcon icon="cart-plus" size="sm" />}>{t('product.addCart')}</Button>
                    </Box>
                </Grid>
            </Grid>
            }
        </Container>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {addCart, setAlert})(ProductDetail);