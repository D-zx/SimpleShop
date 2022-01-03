import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    avatar : {
        position: "absolute",
        width: theme.spacing(20),
        height: theme.spacing(20),
        border: "1px solid",
    },

    uploadButton :{
        borderRadius: "50%",
        border: "1px solid",
        marginLeft: theme.spacing(15),
        marginTop: theme.spacing(10),
        background: "#eeeeee",
        fontSize: "12px",
        "&:hover":{
            background: "#e0e0e0"
        }
    },

    imageInput : {
        display: "none"
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        borderRadius: "16px",
        minWidth: theme.spacing(20)
    },

}));