import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box
 } from '@mui/material';

import axios from 'axios';
import { useHistory, useLocation } from "react-router";
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../styles/products';

const ShopFilter = () => {
    let history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const [shops, setShops]= useState([])
    const [checked, setChecked]= useState({})
    const { t } = useTranslation()
    const classes = useStyles()

    useEffect(()=>{
        const getShops = ()=>{
	        const baseURL = process.env.REACT_APP_API_URL
          axios.get(baseURL+'brands/')
              .then((res)=>{
                setShops(res.data)
              })
              .catch((err)=>{
                console.log(err)
              })
            }  
        getShops()
    },[])

    useEffect(()=>{
      const shopQuery= query.get('brand')
      if(shopQuery){
        const shopArray = shopQuery.split(',')
        shopArray.map((s)=> (
          checked[s]= true
        ))
      }
    },[query, checked])
    
    useEffect(()=>{
      const getFilter = () =>{
        return Object.keys(checked).filter(key => checked[key] === true);
      }
      const shopQuery = getFilter()
      if (shopQuery.length>0){
        history.push('?brand='+shopQuery.toString())
      }
    },[checked, history])
    

    const handleChange = (e) => {
      setChecked({
        ...checked,
        [e.target.name]: e.target.checked,
      })
    }  

    return (
        <Box>
          <Typography variant='h6'>{t("brand.brands")}</Typography>
          <Box className={classes.shops}>
            <FormGroup>
                {shops && shops.map((shop, index) => (
                    <FormControlLabel 
                      control={
                        <Checkbox checked={checked[shop.name]?checked[shop.name]:false} onChange={handleChange} name={shop.name}  />
                      }
                      key={shop.id} 
                      label={shop.name} />
                ))
                }
            </FormGroup>
          </Box>
        </Box>
        
    )
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ShopFilter);