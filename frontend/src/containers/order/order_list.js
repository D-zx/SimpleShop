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

import { editItem, removeFromCart } from "../../actions/order";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router";
import { useStyles } from "../../styles/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";


const OrderList = ({token}) => {
    const { t } = useTranslation();
    const classes = useStyles();


    const [orders, setOrders] = useState([])

    useEffect(()=>{
        const getOrderList = ()=>{
      	  const baseURL = process.env.REACT_APP_API_URL

            const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
        	}
          axios.get(baseURL+`orders/`, config)
          .then((res)=>{
                setOrders([...res.data])
          })
          .catch((err)=>{
            console.log(err)
          })
        }  
        getOrderList()

    },[])

    const history = useHistory();

    const handleClick = (id) => {
        history.push(`orders/${id}`)
    }

	return (
        <Box p={2}>
            <Typography gutterBottom variant='h5'>{t("order.orders")}</Typography>
            {orders && orders.map((order)=>(
                <Paper key={order.pk} onClick={()=>handleClick(order.pk)}>
                    <Box p={2}>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography gutterBottom variant='p'>{t("order.id", {id: order.orderId})}</Typography>
                            </Grid>
                            <Grid item>
                                <Chip label={order.status} />
                            </Grid>

                        </Grid>
                    <hr/>
                    <Typography gutterBottom component="div" variant='p'>{t("order.total",{ length: order.products.length})}</Typography>
                    <Typography gutterBottom component="div" variant='p'>{t("order.amount",{ amount: order.productorders.reduce((a,b) => a=a+(b.qty*b.price),0)})}</Typography>
                    <Typography gutterBottom component="div" variant='p'>{t("order.date",{ date: moment(order.created_at).format("DD-MMMM-YYYY, h:mm a")})}</Typography>
                    </Box>
                </Paper>
            ))}
            {orders.length===0 && (
                    <Box mt={5} p={1}>
                        <Typography align="center" className={classes.noData} component="div">{t("order.noData")}</Typography>
                    </Box>
                    )}
        </Box>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
});

export default connect(mapStateToProps, {editItem, removeFromCart})(OrderList);