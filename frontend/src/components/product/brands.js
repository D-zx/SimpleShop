import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
 } from '@mui/material';

import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useParams } from "react-router";


const Brands = ({token, handleChange, value}) => {
    let params = useParams();
    const [brands, setBrands]= useState([])
    const {t} = useTranslation()
    useEffect(()=>{
        const getBrands = ()=>{
	        const baseURL = process.env.REACT_APP_API_URL
            const config ={
                headers: {"Authorization" : `Bearer ${token}`},
            }
            axios.get(baseURL+`shops/${params['shopID']}/brands/`, config)
                .then((res)=>{
                        setBrands(res.data)

                })
                .catch((err)=>{
                        console.log(err)
                })
            }  
        getBrands()
    },[params, token])


    return (
        <FormControl variant="outlined" fullWidth margin="normal" style={{textAlign: "left"}}>
            <InputLabel htmlFor="brand">{t("product.brand")}</InputLabel>
            <Select 
                    value={value} 
                    onChange={handleChange} 
                    label={t("product.brand")}
                    inputProps={{
                            name: 'brand',
                            id: 'brand',
                        }}
                >
                <MenuItem key={"Brand_0"} value={0} disabled>{t("product.brand_select")}</MenuItem>
                {brands && brands.map((brand)=>(
                    <MenuItem key={"Brand_"+brand.id} value={brand.id}>{brand.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(Brands);