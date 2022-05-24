import './home.css';
import Nav from './Nav';
import Logo from './logo.png';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function Home(props) {
    const [showHomePage, setShowHomePage] = useState(true);

    return (<>
        <Nav setShowHomePage={setShowHomePage} />
        {
            showHomePage
            ? <Box
                display='flex'
                flexDirection='row'
                justifyContent='center'
            >
                <img
                    src={Logo}
                    alt='School Logo'
                    id='logo'
                />
            </Box>
            : <Outlet />
        }
    </>);
}

export default Home;