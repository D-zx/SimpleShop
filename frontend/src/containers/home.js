import React from "react"
import { connect } from 'react-redux';

import {
	Container,
    
} from '@mui/material';

import CategoryList from "../components/category/category_list";

const Home = () => {
	
	return (
        <Container>
            <CategoryList page='home'/>
        </Container>
    )
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps)(Home);