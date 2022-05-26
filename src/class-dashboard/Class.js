
import { Box, Paper, Stack, Card, Button } from '@mui/material';
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
                <Button onClick={() => removeClass(props.data.id, props.teachers, props.students)}>Rem</Button>

            </Card>}


        </>
    );
}

export default Class