import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

import Navbar from '../components/navbar';
import AccountRoutes from './account.route';
import AdminRoutes from './admin.route';
import Breadcrumbs from '../components/breadcamp';
import Home from '../containers/home';
import Products from '../containers/product/products';
import ProductDetail from '../containers/product/product_detail';
import Cart from '../containers/cart';
import ChekOut from '../containers/check_out';
import OrderList from '../containers/order/order_list'
import OrderDetail from '../containers/order/order_detail'

const Routes = () => {
    return (
        <Router>
            <Suspense fallback="loading">
                <StyledEngineProvider injectFirst >
                    <StylesProvider injectFirst >
                        <ThemeProvider theme={theme} >
                            <Navbar>
                                <Breadcrumbs />
                                <Switch>
                                    <Route path='/account'><AccountRoutes/></Route>
                                    <Route path='/admin'><AdminRoutes/></Route>
                                    <Route path='/products/:productName' component={ProductDetail}/>
                                    <Route path='/cart' component={Cart}/>
                                    <Route path='/check-out' component={ChekOut}/>
                                    <Route path='/orders/:orderId' component={OrderDetail}/>
                                    <Route path='/orders' component={OrderList}/>
                                    <Route path='/:category' component={Products}/>
                                    <Route path='' component={Home}/>
                                </Switch>
                            </Navbar>
                        </ThemeProvider>
                </StylesProvider>
                </StyledEngineProvider>
            </Suspense>
        </Router>
    )
};

export default Routes;