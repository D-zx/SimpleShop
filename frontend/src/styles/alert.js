import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    root: {
        position: "relative",
    },
    alert: {
        margin: theme.spacing(3, 0, 2),
        zIndex: 1500,
        maxWidth: 300,
        position: "absolute",
        right: 0,
        left: 0,
        marginLeft: "auto",
    },
    alertMessage: {
        margin: theme.spacing(1),
    }
    
})
)