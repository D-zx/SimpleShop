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
import {useStyles} from '../../../styles/admin'
import CreateDialog from '../../../components/shop/create_dialog'
import { deleteShop } from "../../../actions/admin/shop";

const ShopList = ({token, status, deleteShop}) => {
	const classes = useStyles()
    const { t } = useTranslation()
    const [datas, setDatas] = useState([]);
    const [name, setName] = useState("")
	useEffect(()=>{
        const getShop = () => {
            const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
                params: { name: name }
        	}
	        const baseURL = process.env.REACT_APP_API_URL
			axios.get(baseURL+'shops/', config)
			.then((res)=>{
				setDatas(res.data)
			})
			.catch((err)=>{
				console.log(err)
			})
        }
        getShop()
        
    },[name, status, token])

    const handleChange = (e)=>{
        setName(e.target.value)
    }

	return (
        <Container>
            <Typography className={classes.title} variant="h4" id="tableTitle" component="div">{t("shop.myShop")}</Typography>
            <TableContainer className={classes.table}>
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
                                label={t("shop.search")}
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
                            <TableCell className={classes.cell}>{t("shop.name")}</TableCell>
                            <TableCell className={classes.cell}>{t("shop.phone")}</TableCell>
                            <TableCell className={classes.cell}>{t("shop.address")}</TableCell>
                            <TableCell className={classes.cell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className={classes.cell}>{data.name}</TableCell>
                                <TableCell className={classes.cell}>{data.phone}</TableCell>
                                <TableCell className={classes.cell}>{data.address}</TableCell>
                                <TableCell className={classes.cell}>
                                    <IconButton href={"shop/"+data.id} ><FontAwesomeIcon icon="info-circle" size="sm" /></IconButton>
                                    <IconButton onClick={()=>{deleteShop(data.url)}}><FontAwesomeIcon icon="trash" size="sm"/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {datas.length===0 && (
                    <Box mt={5} p={1}>
                        <Typography align="center" className={classes.noData} component="div">{t("shop.noData")}</Typography>
                    </Box>
                    )}
            </TableContainer>
        </Container>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    status: state.admin.shop.status,
});

export default connect(mapStateToProps, {deleteShop})(ShopList);