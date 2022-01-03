import React from 'react';
import { connect } from 'react-redux';


import { Switch, Route, useRouteMatch,useLocation, Redirect} from "react-router-dom";
import ShopList from "../containers/admin/shop";
import Shop from "../containers/admin/shop/detail";
import BrandList from "../containers/admin/brand";
import Brand from "../containers/admin/brand/detail";
import CategoryList from "../containers/admin/category";
import Category from "../containers/admin/category/detail";
import ProductList from "../containers/admin/product";
import Product from "../containers/admin/product/detail";

const AccountRoutes = ({isAuthenticated}) => {
  let { path } = useRouteMatch();
  let location  = useLocation();

  if (!isAuthenticated){
		return <Redirect to='/' />;
	}

  return (
    <Switch>
        <Redirect from="*(/+)" to={location.pathname.slice(0, -1)} />
        <Route exact path={`${path}/shop`} component={ShopList}/>
        <Route exact path={`${path}/shop/:shopID`} component={Shop}/>
        <Route exact path={`${path}/shop/:shopID/brand`} component={BrandList}/>
        <Route exact path={`${path}/shop/:shopID/brand/:brandID`} component={Brand}/>
        <Route exact path={`${path}/shop/:shopID/category`} component={CategoryList}/>
        <Route exact path={`${path}/shop/:shopID/category/:categoryID`} component={Category}/>
        <Route exact path={`${path}/shop/:shopID/product`} component={ProductList}/>
        <Route exact path={`${path}/shop/:shopID/product/:productID`} component={Product}/>
    </Switch>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AccountRoutes);