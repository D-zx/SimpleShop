import axios from 'axios';
import { store } from '../../store';
import { setAlert } from '../alert';
import { createImage } from '../admin/image';
const baseURL = process.env.REACT_APP_API_URL

export const createProduct = (data, shopId, images) => async dispatch => {
    const token = store.getState().auth.token
    const config ={
        headers: {"Authorization" : `Bearer ${token}`},
      }
    axios.post(baseURL+`shops/${shopId}/products/`,data, config)
      .then((res)=>{
        dispatch({
            type: "CREATEPRODUCT_SUCCESS",
            payload: data
        })
        dispatch({
            type: "INIT",
        })
        dispatch(setAlert('Successfuly created a Product.', 'success'));
        images.map((image)=>(
          dispatch(createImage(image,res.data.id, shopId))
        ))
      })
      .catch((err)=>{
        try{
          const data = err.response.data
          dispatch({
            type: "CREATEPRODUCT_FAIL",
            payload: data
            })
        }catch (ERR_CONNECTION_REFUSED){
            console.log("Connection Timeout!!")
        }
      })
}

export const updateProduct = (url, data) => async dispatch => {
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
            type: "UPDATEPRODUCT_SUCCESS",
            payload: data
        })
        dispatch(setAlert('Update Success', 'success'));
      })
      .catch((err)=>{
        try{
          const data = err.response
          console.log(data)
          dispatch({
            type: "UPDATEPRODUCT_FAIL",
            payload: data
            })
        }catch (ERR_CONNECTION_REFUSED){
          console.log("Connection Timeout!!")
        }
      })
}

export const deleteProduct = (url) => async dispatch => {
  const token = store.getState().auth.token
  const config ={
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }
  axios.delete(url,config)
    .then((res)=>{
      dispatch({
          type: "DELETEPRODUCT_SUCCESS",
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
          type: "DELETEPRODUCT_FAIL",
          payload: data
          })
      }catch (ERR_CONNECTION_REFUSED){
          console.log("Connection Timeout!!")
      }
    })
}