import axios from 'axios';
import { store } from '../../store';
import { setAlert } from '../alert';
const baseURL = process.env.REACT_APP_API_URL

export const createCategory = (data, shopId) => async dispatch => {
    const token = store.getState().auth.token
    const config ={
        headers: {"Authorization" : `Bearer ${token}`},
      }
      axios.post(baseURL+`shops/${shopId}/categories/`,data, config)
      .then((res)=>{
        dispatch({
            type: "CREATECATEGORY_SUCCESS",
            payload: data
        })
        dispatch({
            type: "INIT",
        })
        dispatch(setAlert('Successfuly created a Category.', 'success'));
      })
      .catch((err)=>{
        try{
          const data = err.response.data
          dispatch({
            type: "CREATECATEGORY_FAIL",
            payload: data
            })
        }catch (ERR_CONNECTION_REFUSED){
            console.log("Connection Timeout!!")
        }
      })
}

export const updateCategory = (url, data) => async dispatch => {
    const token = store.getState().auth.token
    const config ={
        headers: {
          "Authorization" : `Bearer ${token}`
        },
      }
      axios.put(url, data,config)
      .then((res)=>{
        dispatch({
            type: "UPDATECATEGORY_SUCCESS",
            payload: data
        })
        dispatch(setAlert('Update Success', 'success'));
      })
      .catch((err)=>{
        try{
          const data = err.response
          console.log(data)
          dispatch({
            type: "UPDATECATEGORY_FAIL",
            payload: data
            })
        }catch (ERR_CONNECTION_REFUSED){
            console.log("Connection Timeout!!")
        }
      })
}

export const deleteCategory = (url) => async dispatch => {
  const token = store.getState().auth.token
  const config ={
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }
    axios.delete(url,config)
    .then((res)=>{
      dispatch({
          type: "DELETECATEGORY_SUCCESS",
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
          type: "DELETECATEGORY_FAIL",
          payload: data
          })
      }catch (ERR_CONNECTION_REFUSED){
          console.log("Connection Timeout!!")
      }
    })
}