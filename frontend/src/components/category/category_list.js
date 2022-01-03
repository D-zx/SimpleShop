import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  Grid,
  Paper,
  Box,
  Typography,
  Container
 } from '@mui/material';

import axios from 'axios';
import { useHistory } from "react-router";
import { useStyles } from '../../styles/admin';


const CategoryList = ({page}) => {
    let history = useHistory();
    const [categories, setCategories]= useState([])
    const classes = useStyles()
    useEffect(()=>{
        const getCategories = ()=>{
	        const baseURL = process.env.REACT_APP_API_URL
            axios.get(baseURL+'categories/')
                .then((res)=>{
                    setCategories(res.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }  
            getCategories()
    },[])

    const redirectTo = (name) => {
      history.push('/'+name)
    }

    return (
          <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
                '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              },
            }}
          >
            {categories.length > 0 && (
              categories.map((item, index) => (
                  <Paper key={index} onClick={()=>redirectTo(item.name)}>
                    <Typography variant='h6' align='center'>
                      {item.name.toUpperCase()}
                    </Typography>
                  </Paper>
              ))
            )}
          </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(CategoryList);