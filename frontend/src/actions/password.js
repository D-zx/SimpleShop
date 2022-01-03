import axios from 'axios';
import { store } from '../store';

const baseURL = process.env.REACT_APP_API_URL

export const changePassword = (data) => async dispatch => {
    const token = store.getState().auth.token
    dispatch({
        type: "SHOW_LOADING",
    });

    const config ={
        headers: {"Authorization" : `Bearer ${token}`}
    }
    axios.put(baseURL + 'account/change-password/',data, config)
    .then(function (res){
        dispatch({
            type: "CHANGEPASSWORD_SUCCESS"
        })
        
    })
    .catch(function (err){
        try{
            const data = err.response.data
            dispatch({
                type: "CHANGEPASSWORD_FAIL",
                payload: data
            });
            
        }catch (ERR_CONNECTION_REFUSED){
            dispatch({
                type: "CONNECTION_ERROR",
            });
            alert("Connection Timeout!!")
        }
    });
};

export const resetPassword = (data) => async dispatch => {
    
    axios.post(baseURL + 'account/reset-password/', data)
    .then(function (res){
        dispatch({
            type: "RESETPASSWORD_SUCCESS"
        })
        
    })
    .catch(function (err){
        try{
            const data = err.response.data
            if (data.detail){
                data.email = "User Not found with that email address"
            }
            dispatch({
                type: "RESETPASSWORD_FAIL",
                payload: data
            });
            
        }catch (ERR_CONNECTION_REFUSED){
            dispatch({
                type: "CONNECTION_ERROR",
            });
            alert("Connection Timeout!!")
        }
    });
};

export const resetPasswordConfirm = (data,params) => async dispatch => {
    dispatch({
        type: "SHOW_LOADING",
    });
    axios.put(baseURL + `account/reset-password-confirmation/${params['uuid']}/${params['token']}/`, data)
    .then(function (res){
        console.log(res)
        dispatch({
            type: "RESETPASSWORDCONFIRM_SUCCESS"
        })
    })
    .catch(function (err){
        try{
            const data = err.response.data
            dispatch({
                type: "RESETPASSWORDCONFIRM_FAIL",
                payload: data
            });
            
        }catch (ERR_CONNECTION_REFUSED){
            dispatch({
                type: "CONNECTION_ERROR",
            });
            alert("Connection Timeout!!")
        }
    });
};