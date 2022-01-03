import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


import {
    Box,
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
} from '@mui/material';

import { editItem, removeFromCart } from "../actions/order";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router";
import { useStyles } from "../styles/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = ({products, editItem, removeFromCart, isAuthenticated}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [total, setTotal]= useState(0)
    const [fee, setFee]= useState(0)
    let history = useHistory();


    const handleChage = (e,id) =>{
        editItem(id, e.target.value)
    };

    const handleDelete = (e, id) =>{
        removeFromCart(id)
    };

    products.reduce((a, b) => {
        let estKey = (b['shop']); 
        (a[estKey] ? a[estKey]: (a[estKey] = null||[])).push(b);
        return a;
    },{});

    useEffect(()=>{
        setTotal(products.reduce((a,b) => a=a+(b.qty*b.price),0))
    },[products])

    if (!isAuthenticated){
		return <Redirect to='/' />;
	}

	return (
        <>
        {products && 
            products.map((product)=>(
            <Grid className={classes.root} container spacing={2}> 
                <Grid item xs={9}>
                    <Paper>
                        <Grid container key={product.id} p={2}>
                            <Grid item xs={1} p={2} container alignItems="center">
                                <img
                                    className={classes.images}
                                    src={product.images[0].image}
                                    srcSet={product.images[0].image}
                                    alt={product.name}
                                    loading="lazy"
                                />
                            </Grid>
                            <Grid item xs={6} p={2}>
                                <Typography gutterBottom variant='h5'>{product.name}</Typography>
                                <Typography  variant='subtitle1'>
                                    {product.brand_detail.name}, 
                                    {product.category_detail.map((category)=>(
                                        category.name+', ' 
                                    ))}
                                    </Typography>
                                <Typography  variant='subtitle2'>{t('cart.inStock', {stock: product.stock})}</Typography>
                                
                            </Grid>
                            <Grid item  xs={2} p={2}>
                                <Typography gutterBottom variant='h5' color='red'>{product.price}</Typography>
                            </Grid>
                            <Grid item  xs={2} p={2} >
                                <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0, max: product.stock } }} value={product.qty} label={t('product.quantity')} onChange={(e)=>handleChage(e,product.id)}/>
                            </Grid>
                            <Grid item  xs={1} p={2} mt={2}>
                                <FontAwesomeIcon icon="trash" size='lg' className={classes.deleteIcon} onClick={(e)=>handleDelete(e,product.id)} />
                            </Grid>
                        </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper>
                    <Box p={2} >
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant='body1'>{t("cart.subTotal",{ length: products.length})}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant='body1'>{t("product.currency")} {total}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant='body1'>{t("cart.shipping")}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant='body1'>{t("product.currency")} {fee}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant='h6'>{t("cart.total")}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant='h6'>{t("product.currency")} {total+fee}</Typography>
                            </Grid>
                        </Grid>
                        <Button variant='outlined' fullWidth onClick={()=>history.push('/check-out')} className={classes.checkoutButton}>{t("cart.checkout")}</Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
        ))
        }
        {products.length == 0 &&
            <Typography align="center" variant="h6">{t("cart.noItem")}</Typography>
        }
        </>
    )
}

const mapStateToProps = state => ({
    products: state.order.products,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {editItem, removeFromCart})(Cart);