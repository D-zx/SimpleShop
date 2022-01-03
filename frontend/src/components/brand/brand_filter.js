import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Typography
 } from '@mui/material';

import axios from 'axios';
import { useHistory, useLocation, useParams } from "react-router";
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../styles/products';


const BrandFilter = () => {
    let history = useHistory();
    let params = useParams();
    const query = new URLSearchParams(useLocation().search);
    const [brands, setBrands]= useState([])
    const [checked, setChecked]= useState({})
    const {t} = useTranslation()
    const classes = useStyles()

    useEffect(()=>{
        const getBrands = ()=>{
	        const baseURL = process.env.REACT_APP_API_URL
          const config = {
              params: { 
                category: params['category'],
                brands: query.get('brand')
              }
            }
          axios.get(baseURL+'brands/', config)
              .then((res)=>{
                setBrands(res.data)
              })
              .catch((err)=>{
                console.log(err)
              })
            }  
        getBrands()
    },[query.get('brands'),params])

    
    
    useEffect(()=>{
      const getFilter = () =>{
        return Object.keys(checked).filter(key => checked[key] === true);
      }
      const brandQuery = getFilter()
      if ( Object.keys(checked).length > 0 ){
        history.push('?brand='+brandQuery.toString())
      }
    },[checked])
    

    const handleChange = (e) => {
      setChecked({
        ...checked,
        [e.target.name]: e.target.checked,
      })
    }  

    useEffect(()=>{
      const brandQuery= query.get('brand')
      if(brandQuery){
        const brandArray = brandQuery.split(',')
        brandArray.map((b)=> (
          checked[b]= true
        ))
      }
    },[])


    return (
        <Box>
          <Typography variant='h6'>{t("brand.brands")}</Typography>
          <Box className={classes.brandsList}>
            <FormGroup>
              {brands && brands.map((brand, index) => (
                  <FormControlLabel 
                    control={
                      <Checkbox checked={checked[brand.name]?checked[brand.name]:false} onChange={(e)=>handleChange(e)} name={brand.name}  />
                    }
                    key={brand.id} 
                    label={brand.name} />
              ))
              }
            </FormGroup>
          </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(BrandFilter);