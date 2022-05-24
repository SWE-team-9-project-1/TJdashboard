import { Box, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';

function Nav(props) {
    return (<>
        <Paper
            id='nav-bar'
        >
            <nav>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='left'
                    id='nav-stack'
                >
                    <Box onClick={() => props.setShowHomePage(true)}>
                        <Link to="/" className='nav-link'>
                            <NavButton>Home</NavButton>
                        </Link>
                    </Box>
                    <Box onClick={() => props.setShowHomePage(false)}>
                        <Link to="/event-calendar" className='nav-link'>
                            <NavButton>Event Calendar</NavButton>
                        </Link>
                    </Box>
                    <Box onClick={() => props.setShowHomePage(false)}>
                        <Link to="/class-dashboard" className='nav-link'>
                            <NavButton>Class Dashboard</NavButton>
                        </Link>
                    </Box>
                    <Box onClick={() => props.setShowHomePage(false)}>
                        <Link to="/student-directory" className='nav-link'>
                            <NavButton>Student Directory</NavButton>
                        </Link>
                    </Box>
                    <Box onClick={() => props.setShowHomePage(false)}>
                        <Link to="/teacher-directory" className='nav-link'>
                            <NavButton>Teacher Directory</NavButton>
                        </Link>
                    </Box>
                </Stack>
            </nav>
        </Paper>
    </>);
}

export default Nav;