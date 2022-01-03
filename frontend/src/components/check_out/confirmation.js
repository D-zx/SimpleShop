import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';

import {
    Box,
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
} from '@mui/material';

import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router";
import { useStyles } from "../../styles/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmOrder } from "../../actions/order";

const ConfirmOrder = ({products,address, payment, id, userId, confirmOrder}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [total, setTotal]= useState(0)
    const [fee, setFee]= useState(0)

    products.reduce((a, b) => {
        let estKey = (b['shop']); 
        (a[estKey] ? a[estKey]: (a[estKey] = null||[])).push(b);
        return a;
    },{});

    useEffect(()=>{
        setTotal(products.reduce((a,b) => a=a+(b.qty*b.price),0))
    },[products])

    const deliverAddress = address.address+', '+address.city+', '+address.zip+', '+address.country

    const submitConfirm = () =>{
        const data ={
            orderId: id,
            address: deliverAddress,
            phone: address.phone,
            productorders: products,
            user: userId
        }
        console.log(products)
        confirmOrder(data)
    }

	return (
        <Box p={2} width="sm" >
            <Typography variant='h5'>{t("order.confirmation")}</Typography>
            <hr/>
            <Box ml={4}>
                <Typography variant='p'>{t("order.id", {id: id})}</Typography>
            </Box>
            <hr/>
            <Box p={2}>
                <Typography variant='h6'>{t("shipping.info")}</Typography>
                <Box m={2}>
                <Grid container>
                    <Grid item xs={3} alignItems="center">
                        {t("shipping.name")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {address.name}
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={3} alignItems="center">
                        {t("shipping.phone")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {address.phone}
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={3} alignItems="center">
                        {t("shipping.email")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {address.email}
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={3} alignItems="center">
                        {t("shipping.address")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {deliverAddress}
                    </Grid>
                </Grid>
                </Box>
            </Box>
            <hr/>
            <Box p={2}>
                <Typography variant='h6'>{t("payment.info")}</Typography>
                <Grid container ml={2}>
                    <Grid item xs={3} alignItems="center">
                        {t("payment.method")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {t("payment.cash")}
                    </Grid>
                </Grid>
            </Box>
            <hr/>
            <Box p={2}>
            <Typography variant='h6'>{t("order.items")}</Typography>
            {products && 
                    products.map((product)=>(
                        <Grid container key={product.id} p={2}>
                            <Grid item xs={1}  container alignItems="center">
                                <img
                                    className={classes.images}
                                    src={product.images[0].image}
                                    srcSet={product.images[0].image}
                                    alt={product.name}
                                    loading="lazy"
                                />
                            </Grid>
                            <Grid item xs={3} container alignItems="center">
                                <Typography gutterBottom variant='h5'>{product.name}</Typography>
                            </Grid>
                            <Grid item xs={3} container alignItems="center">
                                <Typography  variant='subtitle1'>
                                    {product.brand_detail.name}
                                </Typography>
                            </Grid>
                            <Grid item  xs={2}  container alignItems="center">
                                <Typography gutterBottom variant='h5' >{product.qty}</Typography>
                            </Grid>
                            <Grid item  xs={2}  container alignItems="center">
                                <Typography gutterBottom variant='h5' >{product.price}</Typography>
                            </Grid>
                        </Grid>
                    ))
                }
                <hr/>
                <Grid xs={6} item container>
                        <Grid item container justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant='p'>{t("cart.subTotal",{ length: products.length})}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant='p'> {total} {t("product.currency")}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant='p'>{t("cart.shipping")}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant='p'> {fee} {t("product.currency")}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant='p'>{t("cart.total")}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant='p'>{total+fee} {t("product.currency")}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Button variant='outlined' fullWidth onClick={()=>submitConfirm()} className={classes.checkoutButton}>{t("order.confirm")}</Button>
        </Box>
    )
}

const mapStateToProps = state => ({
    products: state.order.products,
    address: state.order.address,
    payment: state.order.payment,
    id: state.order.orderId,
    userId: state.auth.userId
});
export default connect(mapStateToProps, {confirmOrder})(ConfirmOrder);