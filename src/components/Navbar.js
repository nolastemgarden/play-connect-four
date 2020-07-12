import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";

// Image Imports
// import logo from "../images/nsgLogo100px.png";

// CUSTOM COMPONENTS


// MATERIAL-UI COMPONENTS
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


// MATERIAL-UI ICONS
import MenuIcon from '@material-ui/icons/Menu';



import { makeStyles } from '@material-ui/core/styles';
import { findAllByPlaceholderText } from '@testing-library/react';

const useStyles = makeStyles((theme) => ({
    navbar: {
        width: '100vw',
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText,
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        // color: theme.palette.common.white,
        // color: '#fff',
    },
    container: {
        // border: 'solid red 1px',
        // width: '100%',
        // backgroundColor: theme.palette.primary.main, // Matches Logo Background
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    spacer: {
        // border: 'solid red 1px',
        width: '6%',
    },
    brandName: {

    },
    menu: {
        // border: 'solid red 1px',
        width: '5%',
        marginRight: '1%',
        // alignSelf: 'end',
        // justifySelf: 'right'
    },
    menuButton: {
        color: theme.palette.primary.contrastText,
        // marginRight: 0
        // justifySelf: 'end'
    }

}));

export default function Navbar(props) {
    const classes = useStyles();
    return (
        <AppBar
            position="sticky"
            className={classes.navbar}
            elevation={2}
        >
            <Container className={classes.container} maxWidth='md'>

                <Box className={classes.spacer}/>

                <Typography
                    className={classes.brandName}
                    variant='h4'
                >
                    {props.pageTitle}
                </Typography>

                <SimpleMenu  />

            </Container>
        </AppBar>
    );
}



function SimpleMenu() {
    const classes = useStyles();
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={classes.menu}>
            <Button 
                className={classes.menuButton} 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleClick}
            >
                <MenuIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem 
                    onClick={handleClose}
                    component={RouterLink}
                    to='/'
                >
                    Welcome Page
                </MenuItem>

                <MenuItem 
                    onClick={handleClose}
                    component={RouterLink}
                    to='/classic_mode'
                >
                    Play in Classic Mode
                </MenuItem>

                <MenuItem 
                    onClick={handleClose}
                    component={RouterLink}
                    to='/multiplication_mode'
                >
                    Play with Math Fact Practice
                </MenuItem>
            </Menu>
        </Box >
    );
}