import axios from 'axios';
import { store } from '../../store';
import { setAlert } from '../alert';
const baseURL = process.env.REACT_APP_API_URL

export const createShop = (data) => async dispatch => {
    const token = store.getState().auth.token
    const config ={
        headers: {"Authorization" : `Bearer ${token}`},
      }
      axios.post(baseURL+'shops/',data, config)
      .then((res)=>{
        dispatch({
            type: "CREATESHOP_SUCCESS",
            payload: data
        })
        dispatch({
            type: "INIT",
        })
        dispatch(setAlert('Successfuly created a shop.', 'success'));
      })
      .catch((err)=>{
        try{
          const data = err.response.data
          dispatch({
            type: "CREATESHOP_FAIL",
            payload: data
            })
        }catch (ERR_CONNECTION_REFUSED){
            console.log("Connection Timeout!!")
        }
      })
}

export const updateShop = (url, data) => async dispatch => {
    console.log(data)
    const token = store.getState().auth.token
    const config ={
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      }
      axios.put(url, data,config)
      .then((res)=>{
        dispatch({
            type: "UPDATESHOP_SUCCESS",
            payload: data
        })
        dispatch(setAlert('Update Success', 'success'));
      })
      .catch((err)=>{
        try{
          const data = err.response
          console.log(data)
          dispatch({
            type: "UPDATESHOP_FAIL",
            payload: data
            })
        }catch (ERR_CONNECTION_REFUSED){
            console.log("Connection Timeout!!")
        }
      })
}

export const deleteShop = (url) => async dispatch => {
  const token = store.getState().auth.token
  const config ={
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }
    axios.delete(url,config)
    .then((res)=>{
      dispatch({
          type: "DELETESHOP_SUCCESS",
      })
      dispatch(setAlert('Successfully Deleted.', 'success'));
      dispatch({
          type: "INIT",
      })
    })
    .catch((err)=>{
      dispatch(setAlert('Cannot Delete!', 'error'));
      try{
        const data = err.response
        dispatch({
          type: "DELETESHOP_FAIL",
          payload: data
          })
      }catch (ERR_CONNECTION_REFUSED){
          console.log("Connection Timeout!!")
      }
    })
}