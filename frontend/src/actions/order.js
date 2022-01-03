import { store } from '../store';
import axios from 'axios';
import { setAlert } from '../actions/alert';

const baseURL = process.env.REACT_APP_API_URL

export const addCart = (data, quantity) => async dispatch => {
    const products = store.getState().order.products
    if(products.some(p => p.id === data.id)){
        products.map(p =>{
            if(p.id === data.id){
                p.qty += parseInt(quantity)
            }
            return(p)
        })
    }else{
        data.qty = parseInt(quantity)
        data.product = data.id
        products.push(data)
    }
    
    dispatch({
        type: "ADDTO_CART",
        payload: products
    })
    dispatch(setAlert('Item is added to your cart', 'success'));
    
};

export const removeFromCart = (id) => async dispatch => {
    dispatch({
        type: "REMOVEFROM_CART",
        payload: id
    })
};

export const editItem = (id,quantity) => async dispatch => {
    const products = store.getState().order.products
    products.map(p =>{
        if(p.id === id){
            p.qty = parseInt(quantity)
        }
        return(p)
    })
    dispatch({
        type: "EDIT_ITEM",
        payload: products
    })
};

export const deliveryAddress = (address) => async dispatch => {
    dispatch({
        type: "DELIVERY_ADDRESS",
        payload: address
    })
};

export const setPayment = (payment) => async dispatch => {
    dispatch({
        type: "SET_PAYMENT",
        payload: payment
    })
};


export const confirmOrder = (data) => async dispatch => {
    const token = store.getState().auth.token
    const config ={
        headers: {"Authorization" : `Bearer ${token}`},
      }
    axios.post(baseURL+`orders/`,data, config)
    .then((res)=>{
        dispatch({
            type: "CREATEORDER_SUCCESS",
            payload: res
        })
        dispatch(setInitOrder());
        dispatch(setAlert('Successfuly created an order.', 'success'));
    }).catch((err)=>{
        dispatch({
            type: "CREATEORDER_FAIL",
            payload: err
        })
        dispatch(setAlert('Cannot make order right now.', 'error'));
    })
};

export const setInitOrder = () => async dispatch => {
    dispatch({
        type: "SET_INIT_ORDER",
    })
};