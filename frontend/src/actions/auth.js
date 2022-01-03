import axios from 'axios';
import { setAlert } from '../actions/alert';
import { setInitOrder } from '../actions/order';

const baseURL = process.env.REACT_APP_API_URL
const clientID = process.env.REACT_APP_Client_ID
const clientSecret = process.env.REACT_APP_Client_Secret
var querystring = require('querystring');


export const signUp = (data) => async dispatch => {
    dispatch({
        type: "SHOW_LOADING",
    });
    axios.post(baseURL + 'account/sign-up/', data)
    .then(function (res) {
        dispatch({
            type: "SIGNUP_SUCCESS",
            payload: res.data
        })
        dispatch({
            type: "REMOVE_LOADING",
        })
    })
    .catch(function (err) {
        try{
            const data = err.response.data
            dispatch({
                type: "SIGNUP_FAIL",
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

export const signIn = (data) => async dispatch => {
    dispatch({
        type: "SET_LOADING",
    });

    const loadUser = (data)=> {
        const token = data.access_token
        const config ={
            headers: {"Authorization" : `Bearer ${token}`}
        } 
        axios.get(baseURL+'account/', config)
        .then(function (res) {
            dispatch({
                type: "LOADUSER",
                payload: res.data
            })
            console.log("asdf")
            dispatch({
                type: "SIGNIN_SUCCESS",
                payload: data
            })
            dispatch({
                type: "REMOVE_LOADING",
            })
        })
        .catch(function (err) {
            console.log(err)
        })
    }

    const config  = {
        'client_id': clientID,
        'client_secret': clientSecret,
        'grant_type': 'password',
        'scope': 'read',
        ...data
    }
    axios.post(baseURL + 'account/sign-in/', querystring.stringify(config))
    .then(function (res) {
        loadUser(res.data)
    })
    .catch(function (err) {
        console.log(err.response)
        try{
            const data = err.response.data
            if (data.error==="invalid_grant"){
                data.invalid = "Invalid Username or Password"
            }
            dispatch({
                type: "SIGNIN_FAIL",
                payload: data
            });
        }catch (ERR_CONNECTION_REFUSED){
            dispatch({
                type: "CONNECTION_ERROR",
            });
            alert("Connection Timeout!!")
        }
        dispatch({
            type: "REMOVE_LOADING"
        })
    });
};

export const signOut = () => async(dispatch, getState)=> {
    const config ={
        'client_id': clientID,
        'client_secret': clientSecret,
        'token': getState().auth.token
    }
    axios.post(baseURL + 'account/sign-out/', querystring.stringify(config))
    .then(function (res){
        dispatch({
            type: "SIGNOUT"
        })
        dispatch(setInitOrder())
    })
    .catch(function (err){
        console.log(err)
    });
};


