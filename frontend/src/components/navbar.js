import React, { useState } from 'react';
import {
  AppBar, 
  Toolbar, 
  Button, 
  Select, 
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Typography,
  Container,
  Link,
  Badge
 } from '@mui/material';

 import { useStyles } from '../styles/navbar';

import { connect } from 'react-redux';
import { signOut } from '../actions/auth';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthDialogs from './auth/auth_dialog';
import Alert from './alert';

const NavBar = ({signOut, isAuthenticated, user, image,  children, lang, admin, items}) => {
  const classes = useStyles();

  const { t, i18n} = useTranslation()
  const [language, setLanguage]= useState('en')
  
  const handleChange = (e) => {
    const lng = e.target.value
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }


  const Account = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    
    return (
      <div>
        <Button  onClick={(e)=>{setAnchorEl(e.currentTarget)}}>
          <Avatar  className={classes.avatar} src={image}>{user && user.charAt(0)}</Avatar>
          <Typography className={classes.link}>{user}</Typography>
        </Button>
        <Menu
          anchorEl= {anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={Boolean(anchorEl)}
          getcontentanchorel={null}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={()=>setAnchorEl(null)}
         >
          <MenuItem><Button href="/account/profile">{t("auth.profile")}</Button></MenuItem>
          <MenuItem><Button href="/orders">{t("order.myOrders")}</Button></MenuItem>
          <MenuItem><Button onClick={signOut}>{t("auth.sign-out")}</Button></MenuItem>
        </Menu>   
      </div>
    )
  };
  
  return (
    <div>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <Button href='/'><Typography color='black' variant='h5'>{t('title')}</Typography></Button>
          </div>
          {(admin && isAuthenticated) && (
            <div className={classes.menu}>
              <Button href='/admin/shop'><Typography color='black' variant='p'>{t('shop.myShop')}</Typography></Button>
            </div>
          )
          }
          {isAuthenticated && (
            <div>
              <Button href='/cart'>
                <Badge badgeContent={items.length} color="secondary">
                  <FontAwesomeIcon icon="shopping-cart" color='gray' size='lg' flip="horizontal" />
                </Badge>
              </Button>
            </div>
          )
          }
          <Divider orientation="vertical" flexItem  className={classes.divider} />
          <Select 
            variant='standard'
            className={classes.select} 
            value={language} 
            onChange={handleChange} 
            disableUnderline
            MenuProps={{
              getcontentanchorel:   null,
              anchorOrigin: {vertical: "bottom", horizontal: "left"} ,
              transformOrigin: {vertical: "top", horizontal: "left" },
            }}
            >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"mm"}>မြန်မာ</MenuItem>
          </Select>
          
          <Divider orientation="vertical" flexItem  className={classes.divider}/>
          {isAuthenticated ? <Account/>:<AuthDialogs/>}
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Alert />
        {children}
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
	tabindex: state.auth.tabindex,
  user: state.auth.user , 
  image: state.auth.image, 
  isAuthenticated: state.auth.isAuthenticated,
  lang: state.auth.loading,
  admin: state.auth.admin,
  items: state.order.products
});

export default connect(mapStateToProps, {signOut})((NavBar));