import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import SignIn from '../../components/auth/sign_in';
import {Box, CardHeader, CardContent, Paper } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmailConfirm = () => {
  let params = useParams();
  const { t } = useTranslation()
  const [verified , setVeriify] = useState(false);

  useEffect(()=>{
    const url = 'http://localhost:8000/account/signup-confirmation/'+ params["uuid"] +"/"+ params["token"] +'/' 
    axios.get(url)
		.then(function (res) {
      setVeriify(true)
		})
		.catch(function (err) {
      setVeriify(false)
		});
  })
  
  return (
    <Box display='flex' justifyContent="center" >
      <Paper style={{borderRadius: "10px", textAlign: "center",}}>
      {verified && 
      <Box maxWidth={500} p={3}>
        <CardHeader
          title={t("email.confirm.valid.title")}
          subheader={t("email.confirm.valid.subheader")}
        />
        <CardContent>
          <SignIn/>
        </CardContent>
      </Box>}
      {!verified && 
      <Box maxWidth={500} p={3}>
        <CardHeader
          title={t("email.confirm.invalid.title")}
          subheader={t("email.confirm.invalid.subheader")}
        />
        <CardContent>
          <FontAwesomeIcon icon='times' size="5x"/>
        </CardContent>
      </Box>}
      </Paper>
    </Box>
    );
}
export default EmailConfirm;