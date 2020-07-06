import React from 'react';


// My Components
import Navbar from '../components/Navbar';
import ModesOfPlay from "../components/ModesOfPlay";

// MUI  components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'; 
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        // border: 'solid red 1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#4AC9FD',
        // overflow: 'scroll',
    },
    paper: {
        justifySelf: 'center',
        width: '100%',
        height: 'auto',
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: theme.palette.common.white,
        marginTop: '1.5rem',
        padding: '16px',
    },
    paragraph: {
        textIndent: '2rem',
        paddingBottom: '0.7rem',
    },

}));


export default function WelcomePage() {
    const classes = useStyles();
    
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    
    
    
    return (
        <Container 
            className={classes.root} 
            maxWidth='md'
        >
            <Navbar pageTitle={"Welcome to Math Fact Connect Four"} />

            
            
            
            <Paper className={classes.paper} >
                
                <Typography variant='h5' gutterBottom>
                    Welcome to my free version of the classic game Connect Four!                    
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    My name is Nigel Wilson, and I am a math teacher with a passion for games where simple rules lead to complex 
                    strategies. I love to spice up math lessons by integrating them with such games.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    I developed the first version of this game in 2018 while I was working with an afterschool program in New Orleans 
                    called College Track.  The first version of Math Fact Connect Four featured questions about the Rules of Exponents 
                    printed on laminated sheets of paper and tacked to a wooden grid that hung at the front of the classroom. 
                    The game was very popular with the students and they requested that I make more versions of it so that they 
                    could use the connect four grid to practice more than just the rules of exponents.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    I was motivated by their enthusiastic response, but making the laminated cards was tedious, time consuming, and 
                    imposed the limitation that the game could only be used by one class at a time.  Around the same time I was beginning to teach myself 
                    web development, so I decided that it would be a better use of my time to make an online version of the game 
                    rather than more laminated-card versions.  It would be good programming practice, I thought, and also would enable the game 
                    to reach students beyond just my classes.   
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    The game has a few versions that you can play in and all the code is open-source so if you want to help add 
                    additional versions (or you are simply curious how it works under the hood!) you are welcome to &nbsp;
                    <a href="https://github.com/nolastemgarden/play-connect-four">clone the repository</a>!
                </Typography>
                
                <Typography variant='h5' gutterBottom >
                    What are the different modes I can play in?
                </Typography>
                
                <ModesOfPlay />
                
            </Paper>
        </Container>
    );
}