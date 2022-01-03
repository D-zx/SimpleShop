import React, { useEffect, useState } from 'react';
import {
  Box,
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Link,
  Tab,
  Tabs,
  DialogContentText,
 } from '@mui/material';

import { useStyles } from '../../styles/dialog'

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ResetPassword from './reset_password';
import SignIn from './sign_in';
import SignUp from './sign_up';

const TabPanel = (props) => {
	const { children, value, index } = props;
	
	return (
	  <div
		hidden={value !== index}
		id={`tabpanel-${index}`}
	  >
		{value === index && (
		  <Box>
			{children}
		  </Box>
		)}
	  </div>
	);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const Auth = ({setIndex}) =>{
  const classes = useStyles();
  const { t } = useTranslation()

  const [key, setKey] = useState(0)
  const handleChange = (event, newValue) => setKey(newValue);

  return (
    <div>
      <Tabs value={key} onChange={handleChange} centered > 
        <Tab label={t('auth.sign-in')} id="sign_in" />
        <Tab label={t('auth.sign-up')} id="sign_up" />
      </Tabs>
      <TabPanel value={key} index={0} >
        <SignIn/>
        <Box className={classes.action}>
          <Link color="secondary"  href="#" onClick={()=>setIndex('password-reset')} >{t("auth.reset")}</Link>
        </Box>
      </TabPanel>
      <TabPanel value={key} index={1}><SignUp/></TabPanel>
    </div> 
  )
}

const AuthDialogs = ({tabindex, email}) => {
  const classes = useStyles();

  const { t } = useTranslation()

  const [index, setIndex] = useState(tabindex);
  
  useEffect(()=>{
    setIndex(tabindex)
  },[tabindex])
  // dialog open/close
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
      setShow(true)
      setIndex("auth")
    };
  
  const Dialogs = () => {
    switch (index){
      case "auth":
        return (
          <div>
            <DialogTitle className={classes.title}>
              <FontAwesomeIcon icon='user-alt' size="2x"  className={classes.icon}/>
            </DialogTitle>
            <DialogContent className={classes.content}>
              <Auth setIndex={setIndex} />
            </DialogContent>
          </div>
        )

      case "verification-mail-sent":
        return (
          <div>
            <DialogTitle className={classes.title}>
              <FontAwesomeIcon icon='envelope' size="2x"  className={classes.icon}/>
            </DialogTitle>
            <DialogContent className={classes.content}>
              <DialogContentText>
                {t("auth.verification-mail-sent",{ email: email})} 
              </DialogContentText>
              <DialogContentText>
                <Button variant="outlined" color="primary" className={classes.button} onClick={()=>setIndex('auth')}>{t("auth.sign-in")}</Button>
              </DialogContentText>
            </DialogContent>
          </div>
        )

      case "password-reset":
        return (
          <ResetPassword setIndex={setIndex}/>
        )

      default:
        return (
          <ResetPassword setIndex={setIndex}/>
        )
    }
  }

  return (
    <div>
      <Button variant="outlined"  onClick={handleShow}>
        {t('auth.sign-in')} / {t('auth.sign-up')}
      </Button>
      <Dialog open={show} onClose={handleClose} TransitionComponent={Transition} maxWidth="xs" fullWidth={true} PaperProps={{style: {borderRadius: "10px", textAlign: "center"}}}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon='times-circle' size="sm"/>
        </IconButton>
        <Dialogs/>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => ({
  tabindex: state.auth.tabindex,
  email: state.auth.email
});

export default connect(mapStateToProps)(AuthDialogs);