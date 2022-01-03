import React from "react"
import { connect } from 'react-redux';

import {
    Grid,
    Divider
    
} from '@mui/material';

import BrandFilter from '../../components/brand/brand_filter'
import ProductList from "../../components/product/product_list";
import { useStyles } from "../../styles/products.js";

const Products = () => {
	
    const classes = useStyles()

	return (
        <Grid container className={classes.root}>
            <Grid item xs='auto'>
                <BrandFilter/>
                <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={9}>
                <ProductList/>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps)(Products);