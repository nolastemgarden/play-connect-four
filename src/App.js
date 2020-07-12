import React from 'react';
import {
    HashRouter as Router,
    Link as RouterLink,
    Route,
    Switch
} from "react-router-dom";



// My Components & Pages
import Navbar from './components/Navbar';
import WelcomePage from "./pages/WelcomePage";

import ClassicGameWrapper from './pages/ClassicGameWrapper';
import ClassicGame from './pages/ClassicGame';
import MultiplicationGame from './pages/MultiplicationGame';

// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuIcon from '@material-ui/icons/Menu';
// import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

import './App.css';
import theme from "./theme";
import {
    makeStyles,
    ThemeProvider
} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        // backgroundColor: theme.palette.primary.main,
        // backgroundColor: theme.palette.player1,
        // backgroundColor: theme.palette.common.white,
        backgroundColor: theme.palette.primary.light,
        // backgroundColor: '#b3e5fc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',

    },


}));


export default function App() {
    const classes = useStyles();

    console.log(`theme ${theme.palette.primary.main}`)
    
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Box className={classes.root}>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <WelcomePage />
                            </Route>

                            <Route path="/classic_mode">
                                <Navbar pageTitle={"Classic Connect Four"} />
                                <ClassicGameWrapper />

                            </Route>

                            <Route path="/multiplication_mode">
                                <Navbar pageTitle={"Multiplication Fact Connect Four"} />
                                <MultiplicationGame />
                            </Route>

                        </Switch>
                    </Router>
                    {/* <Footer /> */}
                </Box>
            </ThemeProvider>
        </React.Fragment>
        
        
        
    );
}

function Footer() {
    const classes = useStyles();

    return (
        <Box className={classes.footer} >
            <Typography className={classes.footerText} noWrap >
                Produced by the Nola Stem Garden
            </Typography>
        </Box>
    );
}