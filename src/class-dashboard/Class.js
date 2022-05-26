
import { Box, Paper, Stack, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from "react";







function Class(props) {

    const [teachername, setteachername] = useState("");

    //search by teacher, grade, and student 
    // props.teachers.forEach(element => {
    //     console.log(element.class._key.path.segments[6])
    //     if (element.class._key.path.segments[6] === props.data.id) {
    //         setteachername(element.label);
    //     }
    //     else {
    //         setteachername("No Assigned Teacher");
    //     }


    // });

    return (

        <>

            {<Card>
                <Box onClick={() => props.setSelectedClassPage(props.data)}>
                    <Link to="/Class-Page" className='nav-link'>
                        {teachername + "      Grade: "}{props.data.gradeLevel}
                    </Link>

                </Box>

            </Card>}


        </>
    );
}

export default Class