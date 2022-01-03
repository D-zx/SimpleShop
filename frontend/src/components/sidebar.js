import React from 'react';
import {
  Button, 
  Paper,
  List,
  ListItem,
  Grid,
 } from '@mui/material';


import { useTranslation } from 'react-i18next';




const SideBar = ({children}) => {
  const { t } = useTranslation()
  return (
    <Grid container spacing={3}>
        <Grid item md={3} >
        <Paper>
            <List>
                <ListItem><Button href="/account/profile" fullWidth>{t("auth.profile")}</Button></ListItem>
                <ListItem><Button href="/account/change-password" fullWidth>{t("auth.changePassword")}</Button></ListItem>
            </List>
        </Paper>
        </Grid>
        <Grid item sm={12} md={9} container justifyContent = "center">
            {children}
        </Grid>
    </Grid>
  );
}

export default SideBar;