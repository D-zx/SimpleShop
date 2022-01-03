import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';

import {
    Box,
    Paper,
    Grid,
    Typography,
    Chip,
    Button,
} from '@mui/material';

import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router";
import { useStyles } from "../../styles/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";


const OrderDetail = ({token}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    let params = useParams();


    const [order, setOrder] = useState()

    useEffect(()=>{
        const getOrder = ()=>{
      	  const baseURL = process.env.REACT_APP_API_URL

            const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
        	}
          axios.get(baseURL+`orders/${params['orderId']}/`, config)
          .then((res)=>{
                setOrder(res.data)
          })
          .catch((err)=>{
            console.log(err)
          })
        }  
        getOrder()

    },[])

	return (
        <Box p={2}>
            <Typography gutterBottom variant='h5'>{t("order.detail")}</Typography>
            { order && 
                <Box>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography gutterBottom variant='p'>{t("order.id", {id: order.orderId})}</Typography>
                    </Grid>
                    <Grid item>
                        <Chip label={order.status} />
                    </Grid>
                </Grid>
                <hr/>
                <Typography variant='h5'>{t("shipping.info")}</Typography>
                <Grid container >
                    <Grid item xs={3} alignItems="center">
                        {t("shipping.phone")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {order.phone}
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={3} alignItems="center">
                        {t("shipping.address")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {order.address}
                    </Grid>
                </Grid>
                <hr/>
                <Typography variant='h6'>{t("payment.info")}</Typography>
                <Grid container >
                    <Grid item xs={3} alignItems="center">
                        {t("payment.method")}:
                    </Grid>
                    <Grid item xs={9} alignItems="center">
                        {t("payment.cash")}
                    </Grid>
                </Grid>
                <hr/>
                {order.productorders && 
                    order.productorders.map((product)=>(
                        <Box key={product.pk} >
                        <Grid container p={2}>
                            <Grid item xs={1}  container alignItems="center">
                                <img
                                    className={classes.images}
                                    src={product.product_details.images[0].image}
                                    srcSet={product.product_details.images[0].image}
                                    alt={product.product_details.name}
                                    loading="lazy"
                                />
                            </Grid>
                            <Grid item xs={3} container alignItems="center">
                                <Typography gutterBottom variant='h5'>{product.product_details.name}</Typography>
                            </Grid>
                            <Grid item xs={3} container alignItems="center">
                                <Typography  variant='subtitle1'>
                                    {product.product_details.brand_detail.name}
                                </Typography>
                            </Grid>
                            <Grid item  xs={2}  container alignItems="center">
                                <Typography gutterBottom variant='h5' >{product.qty}</Typography>
                            </Grid>
                            <Grid item  xs={2}  container alignItems="center">
                                <Typography gutterBottom variant='h5' >{product.price}</Typography>
                            </Grid>
                        </Grid>
                        <hr/>
                        <Typography gutterBottom component="div" variant='p'>{t("order.total",{ length: order.products.length})}</Typography>
                        <Typography gutterBottom component="div" variant='p'>{t("order.amount",{ amount: order.productorders.reduce((a,b) => a=a+(b.qty*b.price),0)})}</Typography>
                        <Typography gutterBottom component="div" variant='p'>{t("order.date",{ date: moment(order.created_at).format("DD-MMMM-YYYY, h:mm a")})}</Typography>
                        </Box>
                        

                    ))
                }
                    
                </Box>
            }
        </Box>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(OrderDetail);