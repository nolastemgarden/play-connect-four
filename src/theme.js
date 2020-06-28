import React from 'react';


import {
    createMuiTheme,
    makeStyles,
    responsiveFontSizes,
} from '@material-ui/core/styles';



import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
// import { Button, createStyles } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#b3e5fc',
            main: '#2962ff',
            dark: '#0039cb',
        },
        player1: red,
        player2: yellow,
    },
    status: {
        danger: 'orange',
    },
    shape: {
        borderRadius: 8,
    }

});

export default responsiveFontSizes(theme);