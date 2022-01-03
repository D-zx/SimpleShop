import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    title: {
        padding: theme.spacing(1),
        fontWeight: 500,
        fontFamily: "Roboto",
    },
    noData: {
        fontFamily: "Roboto",
        fontSize: 20,
    },

    cell: {
        maxWidth: "450px",
        wordWrap: "break-word",
        fontFamily: "Roboto",
        fontSize: 18
    },
    
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        minWidth: theme.spacing(20)
    },
    
    iconButton: {
        margin: theme.spacing(2),
    },

    detail: {
        maxWidth: 400,
        margin: theme.spacing(2),
    },

    content: {
        padding: theme.spacing(2,5,2,5),
        color: '#757575',
      },

    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
      },

    dialogIcon: {
        border: '2px solid #757575',
        borderRadius: '50%',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        color: '#757575',
    },
    dialogButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        borderRadius: "16px",
        minWidth: theme.spacing(20)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },

    image: {
        overflow: 'auto',
        objectFit: 'contain'
    },

    deleteIcon: {
        color: theme.palette.error.light,
        background: 'white',
        padding: theme.spacing(1),
        border: '2px solid #757575',
        borderRadius: '50%',
        '&:hover': {
            background: "#757575",
            color: 'white',
            cursor: 'pointer',
         },
    }

}));