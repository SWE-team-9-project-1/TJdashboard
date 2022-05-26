
import { Box, Paper, Stack, Card, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, addDoc, setDoc } from "firebase/firestore";







function Class(props) {

    const [teachername, setteachername] = useState("");

    return (
        <>
            <Card className='class-card'>
                <Box
                    onClick={() => props.setSelectedClassPage(doc(props.db, "classes", props.data.id))}
                    flexGrow={1}
                >
                    <Link to="/Class-Page" className='nav-link'>
                        <Typography variant='h3'>
                            {props.classes[props.data.id]}
                        </Typography>
                        <Typography
                            variant='h5'
                            color='text.secondary'
                        >
                            {`Grade ${props.data.gradeLevel}`}
                        </Typography>
                    </Link>
                </Box>
                <Button
                    color='error'
                    variant='contained'
                >
                    Remove
                </Button>
            </Card>
        </>
    );
}

export default Class