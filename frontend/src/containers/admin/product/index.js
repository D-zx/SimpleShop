import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';

import {
	Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TextField,
    Grid,
    Box,
	Typography,
} from '@mui/material';

import axios from "axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyles } from '../../../styles/admin'
import CreateDialog from '../../../components/product/create_dialog'
import { deleteProduct } from "../../../actions/admin/product";
import { useParams } from "react-router";

const ProductList = ({token, status, deleteProduct}) => {
	const classes = useStyles()
    const { t } = useTranslation()
    const [datas, setDatas] = useState([]);
    const [name, setName] = useState("")
    const params = useParams();

	useEffect(()=>{
        const getProduct = () => {
        	const baseURL = process.env.REACT_APP_API_URL
            const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
                params: { name: name }
        	}
			axios.get(baseURL+`shops/${params['shopID']}/products/`, config)
			.then((res)=>{
				setDatas(res.data)
			})
			.catch((err)=>{
				console.log(err)
			})
        }
        getProduct()
        
    },[name, status, params, token])

    const handleChange = (e)=>{
        setName(e.target.value)
    }

	return (
        <Container>
            <TableContainer className={classes.table}>
                <Typography className={classes.title} variant="h4" id="tableTitle" component="div">{t("product.list")}</Typography>
                <Grid container>
                    <Grid item xs={12} sm={3} >
                        <Box display="flex" mt={4} p={1}>
                            <CreateDialog/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                            <TextField 
                                type="text"
                                variant="standard" 
                                margin="normal" 
                                id="title" 
                                label={t("product.search")}
                                name="name" 
                                value={name}
                                onChange={handleChange}
                            />
                        </Box>

                    </Grid>
                </Grid>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>{t("product.name")}</TableCell>
                            <TableCell className={classes.cell}>{t("product.stock")}</TableCell>
                            <TableCell className={classes.cell}>{t("product.price")}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className={classes.cell}>{data.name}</TableCell>
                                <TableCell className={classes.cell}>{data.stock}</TableCell>
                                <TableCell className={classes.cell}>{data.price}</TableCell>
                                <TableCell >
                                    <IconButton href={"product/"+data.id} ><FontAwesomeIcon icon="info-circle" size="sm" /></IconButton>
                                    <IconButton onClick={()=>{deleteProduct(data.url)}}><FontAwesomeIcon icon="trash" size="sm"/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {datas.length===0 && (
                    <Box mt={5} p={1}>
                        <Typography align="center" component="div" className={classes.noData}>{t("product.noData")}</Typography>
                    </Box>
                    )}
            </TableContainer>
        </Container>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    status: state.admin.product.status,
});

export default connect(mapStateToProps, {deleteProduct})(ProductList);