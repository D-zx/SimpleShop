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
import CreateDialog from '../../../components/category/create_dialog'
import { deleteCategory } from "../../../actions/admin/category";
import { useParams } from "react-router";

const CategoryList = ({token, status, deleteCategory}) => {
	const classes = useStyles()
    const { t } = useTranslation()
    const [datas, setDatas] = useState([]);
    const [name, setName] = useState("")
    const params = useParams();

	useEffect(()=>{
        const getCategory = () => {
        	const baseURL = process.env.REACT_APP_API_URL
            const config ={
            	headers: {"Authorization" : `Bearer ${token}`},
                params: { name: name }
        	}
			axios.get(baseURL+`shops/${params['shopID']}/categories/`, config)
			.then((res)=>{
				setDatas(res.data)
			})
			.catch((err)=>{
				console.log(err)
			})
        }
        getCategory()
        
    },[name, status, params, token])

    const handleChange = (e)=>{
        setName(e.target.value)
    }

	return (
        <Container>
            <TableContainer className={classes.table}>
                <Typography className={classes.title} variant="h4" id="tableTitle" component="div">{t("category.list")}</Typography>
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
                                label={t("category.search")}
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
                            <TableCell className={classes.cell}>{t("category.name")}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className={classes.cell}>{data.name}</TableCell>
                                <TableCell >
                                    <IconButton href={"category/"+data.id} ><FontAwesomeIcon icon="info-circle" size="sm" /></IconButton>
                                    <IconButton onClick={()=>{deleteCategory(data.url)}}><FontAwesomeIcon icon="trash" size="sm"/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {datas.length===0 && (
                    <Box mt={5} p={1}>
                        <Typography align="center" component="div" className={classes.noData}>{t("category.noData")}</Typography>
                    </Box>
                    )}
            </TableContainer>
        </Container>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    status: state.admin.category.status,
});

export default connect(mapStateToProps, {deleteCategory})(CategoryList);