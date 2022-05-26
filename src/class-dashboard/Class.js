
import { Box, Paper, Stack, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, addDoc, setDoc } from "firebase/firestore";







function Class(props) {

    const [teachername, setteachername] = useState("");

    return (

        <>

            {<Card

                sx={{

                }}
            >
                <Link to="/Class-Page" className='nav-link'>
                    <Box
                        sx={{
                            minHeight: 50,
                            bgcolor: "#f5f5f5"
                        }}

                        onClick={() => props.setSelectedClassPage(doc(props.db, "classes", props.data.id))}>

                        {props.classes[props.data.id] + "      (Grade "}{props.data.gradeLevel + ")"}


                    </Box>
                </Link>


            </Card>}


        </>
    );
}

export default Class