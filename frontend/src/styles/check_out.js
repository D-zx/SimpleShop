import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    root: {
        minWidth: "1000px"
    },

    images: {
      width: '100%',
      overflow: 'auto',
      objectFit: 'contain',
      
    },

    deleteIcon: {
        "&:hover":{
            cursor: "pointer",
          }
    },

    checkoutButton: {
        marginTop: theme.spacing(2)
    }
    
    

})
)