import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";

// My Components
import Navbar from '../components/Navbar';
import ModesOfPlay from "../components/ModesOfPlay";

// MUI  components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'; 
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    },
    header: {
        padding: '16px',
    },
    panel: {
        width: '100%',
    },
    expansionDetail: {
        display: 'flex',
        flexDirection: 'column',
    },
    paragraph: {
        textIndent: '2rem',
        paddingBottom: '1rem',
    },
    buttonArea: {
        // border: 'solid red 1px',
        margin: 'auto',
        width: '70%',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-around'
    }

}));


export default function WelcomePage() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    
    // What distinguishes Math from Science?
    //    sci... Math...
    //  Bottom Line: Proof vs evidence. 
    // What does Tic Tac Toe have to do with this?
    // --play now button
    // What is the Fifteen Game?
    
    return (
        <Container 
            className={classes.root} 
            maxWidth='md'
        >
            <Navbar pageTitle={"Play Connect Four"} />

            
            
            
            <Paper className={classes.paper} >
                <Box className={classes.header}  >
                    <Typography variant='h6' >
                        {/* Welcome to my free version of the classic game Connect Four. <br /> */}
                    </Typography>
                    <Typography variant='h6' gutterBottom>
                        Welcome to my free version of the classic game Connect Four. <br />
                        My name is Nigel Wilson, and I am a math teacher with a passion for games where simple rules lead to complex strategies.
                </Typography>
                </Box>
                
                {/* What Inspired Me to Create this Game? */}
                <ExpansionPanel
                    className={classes.panel}
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography variant='h4'  >
                            What inspired me to create this game?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionDetail}>
                        
                        <Typography variant='body1' className={classes.paragraph} gutterBottom >
                            In 2018, I was working as a math teacher with an afterschool program in New Orleans called College Track.  Our mission was to help kids from low-income households reach their goal of being first-generation college grads.  Many of the kids complained about the number of boring and tedious worksheets that they were expected to do to practice the math skills they would need on the ACT.  My objective in creating the first version of this game was to make practicing the rules of exponents more fun and engaging.  
                        </Typography>
                        <Typography variant='body1' className={classes.paragraph} gutterBottom >
                            I worked with the students to build a wooden grid that could be hung at the front of the classroom and a set of laminated squares of paper that each had a question printed on it.  After a lesson on how exponents work, students formed two teams and practiced what they had learned through a friendly competition.  The game was very popular and the students requested that I make more versions of it so that they could use the connect four grid to practice more than just the rules of exponents.                        
                        </Typography>
                        <Typography variant='body1' className={classes.paragraph} gutterBottom >
                            Their enthusiasm pleased me, but making the laminated cards was very time consuming and imposed the limitation that the game could only be used by one class at a time.  I want the work that I do as a teacher to have the broadest impact possible, so making something that can only be used by one class at a time is not ideal.  Around that time, I was getting started teaching myself to program in my spare time and it dawned on me that making a Web-app version of this game would be good programming practice and also enable the game to be played by more students.  
                        </Typography>
                          
                    </ExpansionPanelDetails>
                </ExpansionPanel>


                {/* What are the different modes I can play in? */}
                <ExpansionPanel
                    className={classes.panel}
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography variant='h4'  >
                            What are the different modes I can play in?
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionDetail}>
                        
                        <ModesOfPlay />
                        
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                

                <Box className={classes.buttonArea}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={RouterLink}
                        to='/classic_mode'
                    >
                        Play Classic Mode!
                    </Button>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='//multiplication_mode'
                    >
                        Play with Multiplication Practice
                    </Button>

                </Box>
                
              
                

                
                
            </Paper>
        </Container>
    );
}