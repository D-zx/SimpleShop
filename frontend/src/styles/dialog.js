import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    content: {
        padding: theme.spacing(2,5,2,5),
        color: '#757575',
      },
    action: {
        justifyContent: "center",
        marginBottom: theme.spacing(3)
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
      },
    remember:{
        width: '100%', 

        marginLeft: theme.spacing(1),   
      },
    icon: {
        border: '2px solid #757575',
        borderRadius: '50%',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        color: '#757575',
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        borderRadius: "16px",
        minWidth: theme.spacing(20)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    }

})
)