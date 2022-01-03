import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
    breadcrumb: {
        padding: theme.spacing(1,2,1,2),
        margin: theme.spacing(2),
        display: 'inline-flex',
        borderRadius: 5,
    },
    breadcrumbLink: {
        color: theme.palette.text.primary,
        textDecorationColor: theme.palette.text.primary,
    }
})
)