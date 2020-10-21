import { makeStyles } from '@material-ui/core/styles';

const AppPage = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        flex: 1
    }
}));

const Home = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: '1',
        height: '100vh',
        flexDirection: 'column',
        margin: '1%',
    },
    card: {
        padding: '3%'
    },
    document_heading: {
        paddingBottom: '3%'
    },
    formControl: {
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        marginTop: '10px',
        justifyContent: 'space-between',
    },
    formControl_immidiateChilds: {
        display: 'flex',
        flex: '0.48',
        flexDirection: 'column',
        '& > *': {
            marginTop: '20px',
            marginRight: '20px',
        },
    },
    form_submit: {
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        '& button': {
            marginTop: '3%',
            marginRight: '2%'
        }
    },
    form_submit_submit: {
        backgroundColor: "#6f64f8",
        color: "white"
    },
    form_submit_cancel: {
        backgroundColor: "#6d7278",
        color: "white"
    },

}));

const Projects = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: '1',
        height: '100vh',
        flexDirection: 'column',
        margin: '1%',
    },
    card: {
        padding: '3%',
        margin: '3% 0',
    },
    headPadding: {
        padding: '0 0 3% 0',
    },
    form_submit_submit: {
        backgroundColor: "#6f64f8",
        color: "white"
    },
    form_submit_cancel: {
        backgroundColor: "#6d7278",
        color: "white"
    },
}))

export { AppPage, Home, Projects };