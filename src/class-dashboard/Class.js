
import { Box, Paper, Stack, Card, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, addDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";







function Class(props) {

    const [teachername, setteachername] = useState("");
    // console.log(props.students)
    const removeClass = async (id, teachers, students) => {
        // students.forEach(element => {
        //     if (element.class != null) {
        //         if (props.data.id === element.class._key.path.segments[6]) {
        //             updateDoc(doc(props.db, "students", element.id), {
        //                 class: null
        //             });

        //         }
        //     }
        // });
        // teachers.forEach(element => {
        //     if (element.class != null) {
        //         if (props.data.id === element.class._key.path.segments[6]) {
        //             updateDoc(doc(props.db, "teachers", element.id), {
        //                 class: null
        //             });

        //         }
        //     }
        // });
        let remClass = await deleteDoc(props.db, "classes", id)
        // props.load1()
        // props.load2()
        // props.load3()

    }
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