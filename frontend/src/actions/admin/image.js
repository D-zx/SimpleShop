import axios from 'axios';
import { store } from '../../store';
import { setAlert } from '../alert';
const baseURL = process.env.REACT_APP_API_URL

export const createImage = (image, productId, shopId) => async dispatch => {
    const token = store.getState().auth.token
    let status= 'waiting'
    let formData = new FormData();
    formData.append('product', productId)
    formData.append('name', image.name)
    formData.append('image', image)
    const config ={
        headers: {
            'Authorization' : `Bearer ${token}`,
            'content-type': 'multipart/form-data',
            },
      }

    try {
      const res = await axios.post(baseURL+`shops/${shopId}/products/${productId}/images/`,formData, config)
      dispatch({
        type: "CREATEIMAGE_SUCCESS",
        payload: res.data
      })
      dispatch({
          type: "INIT",
      })
      dispatch(setAlert('Successfuly uploaded an image.', 'success'));
      status = 'uploaded'
    }
    catch(err){
      console.log(err.message)
      if (err.message === 'Network Error'){
        console.log("Connection Timeout!!")
      }else{
        const data = err.response.data
        console.log(data)
        dispatch({
          type: "CREATEIMAGE_FAIL",
          payload: data
          })
      }
      status = 'failded'
    }
    return status
}

export const deleteImage = (url) => async dispatch => {
  const token = store.getState().auth.token
  const config ={
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }
    axios.delete(url,config)
    .then((res)=>{
      dispatch({
          type: "DELETEIMAGE_SUCCESS",
      })
      dispatch(setAlert('Image deletion successful.', 'success'));
      dispatch({
          type: "INIT",
      })
    })
    .catch((err)=>{
      try{
        const data = err.response
        dispatch({
          type: "DELETEIMAGE_FAIL",
          payload: data
          })
      }catch (ERR_CONNECTION_REFUSED){
          console.log("Connection Timeout!!")
      }
    })
}