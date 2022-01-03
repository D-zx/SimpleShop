import React, { useEffect, useState } from "react"
import { useFormik } from 'formik';
import { connect } from 'react-redux';

import {
	Box,
	Avatar,
	TextField,
	Button,
	IconButton,
	CircularProgress,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Typography ,
} from '@mui/material';

import axios from "axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyles } from '../../styles/profile';
import { setAlert } from '../../actions/alert'

const Profile = ({ errors, isAuthenticated, token, loading, setAlert }) => {
	const classes = useStyles();
	const { t } = useTranslation()
	const baseURL = process.env.REACT_APP_API_URL

	let [image, setImage] = useState(null)
	const formik = useFormik({
		initialValues: {
			username: '',
			first_name: '',
			last_name: '',
			email: '',
			profile: {
				phone: '',
				birthday: '',
				gender: '',
				address: '',
				image: '',
			}
		},
		onSubmit: values => {
			let formData = new FormData();
			for(let dataKey in values) {
				if(dataKey==="profile"){
					for(let key in values[dataKey]){
						formData.append(`profile.${key}`, values[dataKey][key])
					}

				}else{
					formData.append(dataKey, values[dataKey]);
				}
			  }
			const config ={
            	headers: {
					'Authorization' : `Bearer ${token}`,
					'content-type': 'multipart/form-data',
				}
        	}
			axios.put(baseURL+'account/', formData,  config)
			.then((res)=> {
				setAlert("Profile had been updated", "success")
			})
			.catch((err)=> {
				setAlert("Error occuring to update profile", "error")
			})
		},
	});

	const {
		values,
		handleChange,
		handleSubmit,
		setFieldValue,
		setValues
	} = formik;

	const uploadImage = (e) => {
		let file = e.target.files[0]
		if (file) {
			setFieldValue('profile.image', file)
			setImage(URL.createObjectURL(file))
		}
	}

	useEffect(()=>{
		const getProfile = () => {
			const config ={
            	headers: {"Authorization" : `Bearer ${token}`}
        	}
			axios.get(baseURL+'account/', config)
			.then((res)=>{
				setValues(res.data)
				setImage(res.data.profile.image)
				setFieldValue('profile.image', '')
				console.log(res.data)

			})
			.catch((err)=>{
				console.log(err)
			})
		}
		getProfile()
	},[baseURL, setValues, setFieldValue, token])

	// if (!isAuthenticated){
	// 	return <Redirect to='/' />;
	// }
	return (
		<Box width={1} mt={3}>
			<Typography align="center" variant="h4" className={classes.title}>{t("profile.title")}</Typography>
			<Box height={200} mt={3} display="flex" justifyContent="center">
				<Avatar id="avatar" src={image} className={classes.avatar}></Avatar>
				<label htmlFor="image" >
					<IconButton  aria-label="upload button" component="span" className={classes.uploadButton}>
						<FontAwesomeIcon icon="camera" size="lg"/>
					</IconButton>
					<input className={classes.imageInput} type="file" id="image" name="profile.image" accept="image/*" onChange={e => uploadImage(e)}></input>
				</label>
			</Box>
			<Box p={5} pt={0}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField 
							type="text"
							variant="outlined" 
							margin="normal" 
							required 
							fullWidth 
							id="username" 
							label={t("auth.form.username")}
							name="username" 
							value={values.username}
							onChange={handleChange}
							error={!!errors.username}
							helperText={errors.username}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							type="email"
							variant="outlined" 
							margin="normal" 
							required 
							fullWidth 
							id="email" 
							label={t("auth.form.email")}
							name="email" 
							value={values.email}
							onChange={handleChange}
							error={!!errors.email}
							helperText={errors.email}
							/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							type="text"
							variant="outlined" 
							margin="normal" 
							required 
							fullWidth 
							id="first_name" 
							label={t("auth.form.firstname")}
							name="first_name" 
							value={values.first_name}
							onChange={handleChange}
							error={!!errors.first_name}
							helperText={errors.first_name}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							type="text"
							variant="outlined" 
							margin="normal" 
							fullWidth 
							id="last_name" 
							label={t("auth.form.lastname")}
							name="last_name" 
							value={values.last_name}
							onChange={handleChange}
							error={!!errors.last_name}
							helperText={errors.last_name}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth margin="normal" style={{textAlign: "left"}}>
							<InputLabel htmlFor="gender">{t("auth.form.gender")}</InputLabel>
							<Select 
								value={values.profile.gender} 
								onChange={handleChange} 
								label={t("auth.form.gender")}
								inputProps={{
									name: 'profile.gender',
									id: 'gender',
								}}
								MenuProps={{
									getContentAnchorEl:   null,
									anchorOrigin: {vertical: "bottom", horizontal: "left"} ,
									transformOrigin: {vertical: "top", horizontal: "left" },
									}}
								>
								<MenuItem value={"male"}>{t("auth.form.male")}</MenuItem>
								<MenuItem value={"female"}>{t("auth.form.female")}</MenuItem>
								<MenuItem value={"other"}>{t("auth.form.other")}</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							type="date"
							format="MM/dd/yyyy"
							defaultValue={new Date().toLocaleDateString('fr-CA', { year: "numeric", month: "2-digit", day: "2-digit" })}
							values={values.profile.birthday}
							variant="outlined"
							margin="normal"
							fullWidth
							id="birthday"
							label={t("auth.form.birthday")}
							name="profile.birthday"
							onChange={handleChange}
							
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							type="tel"
							variant="outlined" 
							margin="normal" 
							fullWidth 
							id="phone" 
							label={t("auth.form.phone")}
							name="profile.phone" 
							value={values.profile.phone}
							onChange={handleChange}
							error={errors.profile && !!errors.profile.phone}
							helperText={errors.profile && !!errors.profile.phone}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							type="tel"
							variant="outlined" 
							margin="normal" 
							fullWidth 
							id="address" 
							label={t("auth.form.address")}
							name="profile.address" 
							value={values.profile.address}
							onChange={handleChange}
							error={errors.profile && !!errors.profile.aa}
							helperText={errors.profile && !!errors.profile.aa}
						/>
					</Grid>
				</Grid>
				<Box display="flex" justifyContent='center' mt={3}>
				<Button type='submit' variant="outlined"  onClick={handleSubmit} color="primary" endIcon={loading&&<CircularProgress color="inherit" size={20} />} className={classes.button}>
					{t("auth.form.update")}
				</Button>
				</Box>
			</form>
			</Box>
		</Box>
	);
}

const mapStateToProps = state => ({
	errors: state.auth.changepassword_error || {},
	isAuthenticated: state.auth.isAuthenticated,
	token: state.auth.token,
	loading: state.auth.loading,
});
export default connect(mapStateToProps, { setAlert })(Profile);