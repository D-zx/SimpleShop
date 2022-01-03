import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
 } from '@mui/material';

import axios from 'axios';
import { useHistory, useLocation, useParams } from "react-router";
import { useStyles } from '../../styles/products';
import { useTranslation } from "react-i18next";


const ProductList = ({page}) => {
    let history = useHistory();
    let params = useParams()
    const query = new URLSearchParams(useLocation().search);
    const [products, setProducts]= useState([])
    const classes = useStyles()
    const { t } = useTranslation();
    

    useEffect(()=>{
        const getCategories = ()=>{
	        const baseURL = process.env.REACT_APP_API_URL
            const config = {
                params: { 
                  category: params['category'],
                  brands: query.get('brand')
                }
              }
            axios.get(baseURL+'products/', config)
                .then((res)=>{
                    setProducts(res.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }  
            getCategories()
    },[query.get('brand'), params])

    const [title, setTitle] = useState('')
    useEffect(()=>{
        setTitle(params['categories'])
    },[params])

    const handleClick = (name) => {
        history.push(`/products/${name}`)
    }
    
    return (
        <Box className={classes.product}>
            <Typography gutterBottom variant="h4" component="div">{title}</Typography>
            <Box className={classes.productList}>
                <Grid container spacing={2}>
                {products && products.map((product)=>(
                <Grid item sm={3} key={product.id}>
                    <Card sx={{ maxWidth: 300 }} >
                        <CardActionArea onClick={()=>handleClick(product.name)}>
                        <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={product.images[0].image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name} 
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {product.price} {t('product.currency')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t('cart.inStock', {stock: product.stock})}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                ))}
                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ProductList);