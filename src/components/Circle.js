import React from 'react';

// My Styling
import '../App.css';

// My Components

// MUI  components
import Box from '@material-ui/core/Box';


export default function Circle(props) {
    const status = props.status;

    return (
        <Box className={`circle ${status}`} />
    )
}