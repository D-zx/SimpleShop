import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    root: {
        width: "100%",
        minWidth: "1000px"
    },
    shops: {
        maxHeight: '290px',
        width: '200px',
        overflow: 'auto',
        margin: theme.spacing(1)
      },

    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },

    brandsList: {
        maxHeight: '290px',
        width: '200px',
        overflow: 'auto',
        margin: theme.spacing(1)
      },
    
    product: {
        margin: theme.spacing(3)
      },

    productList: {
        margin: theme.spacing(3)
      },

    previewImage: {
      width: '100%',
      height: '300px',
      overflow: 'auto',
      objectFit: 'contain'
    },
    images: {
      width: '100%',
      overflow: 'auto',
      objectFit: 'contain',
      "&:hover":{
        border: "1px solid orange",
        cursor: "pointer"
      }
    },
    button: {
      margin: theme.spacing(1)
    }
    

})
)