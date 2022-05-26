
import { Box, Paper, Stack, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, addDoc, setDoc } from "firebase/firestore";







function Class(props) {

    const [teachername, setteachername] = useState("");

    return (

        <>

            {<Card
                varient="outlined"
            >
                <Box onClick={() => props.setSelectedClassPage(doc(props.db, "classes", props.data.id))}>
                    <Link to="/Class-Page" className='nav-link'>
                        {props.classes[props.data.id] + "      (Grade "}{props.data.gradeLevel + ")"}
                    </Link>

                </Box>

            </Card>}


        </>
    );
}

export default Class