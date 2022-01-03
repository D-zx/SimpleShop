import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    toolbar: {
        flexWrap: 'wrap',
      },
    logo :{
       flexGrow: 1,
    },

    menu :{
      flexGrow: 100,
      margin: theme.spacing(2),
    },

    link : {
        margin: theme.spacing(2),
    },
    avatar : {
      border: '2px solid #e040fb',
    },
    
    select : {
      margin: 10,
      "& .MuiSelect-select:focus": {
        backgroundColor: "transparent",
        }
    },
    divider : {
      margin: 10,
    },
    container: {
      padding: theme.spacing(1),
    },

    })

)