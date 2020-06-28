import React from 'react';

// My Styling
import '../App.css';

// My Components


// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';




export default function Circle(props) {
    const status = props.status;

    return (
        <Box className={`circle ${status}`} />
    )
}