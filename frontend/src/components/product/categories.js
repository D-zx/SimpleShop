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

const Categories = ({token, handleChange, value}) => {
    let params = useParams();
    const [categories, setCategories]= useState([])
    const {t} = useTranslation()
    useEffect(()=>{
        const getCategories = ()=>{
	        const baseURL = process.env.REACT_APP_API_URL
            const config ={
                headers: {"Authorization" : `Bearer ${token}`},
            }
            axios.get(baseURL+`shops/${params['shopID']}/categories/`, config)
                .then((res)=>{
                        setCategories(res.data)
                })
                .catch((err)=>{
                        console.log(err)
                })
            }  
        getCategories()
    },[params, token])

    return (
        <FormControl variant="outlined" fullWidth margin="normal" style={{textAlign: "left"}}>
            <InputLabel htmlFor="categories">{t("product.categories")}</InputLabel>
            <Select 
                    multiple
                    value={value} 
                    onChange={handleChange} 
                    label={t("product.categories")}
                    inputProps={{
                            name: 'categories',
                            id: 'categories',
                        }}
                >
                <MenuItem key={"Category_0"} value={0} disabled>{t("product.category_select")}</MenuItem>
                {categories && categories.map((category)=>(
                    <MenuItem key={"Category_"+category.id} value={category.id}>{category.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(Categories);
