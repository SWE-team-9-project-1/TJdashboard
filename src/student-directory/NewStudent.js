import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const NewStudent = (props) => {
    const nameRef = useRef();
    const birthdayRef = useRef();
    const [teacher, setTeacher] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const birthday = birthdayRef.current.value;

        const teacherQuery = query(
            collection(props.db, 'teachers'),
            where('name', '==', teacher)
        )
        getDocs(teacherQuery)
        .then((doc) => {        // after getting class ref
            const classRef = (doc.docs[0].data().class);
            addDoc(collection(props.db, "students"), {
                name: name,
                birthday: birthday,
                class: classRef
            })

            document.getElementById("name").value = '';
            document.getElementById("bday").value = '';
            setTeacher("");
            props.bigFunction();
        });
    }

    const handleSelect = (event) => {
        setTeacher(event.target.value);
    }
    
    return (
        <div style={{marginBottom: 20}}>
        <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row">
            <TextField id="name" label="Name" variant="outlined" size="small" type="text" inputRef={nameRef}/>
            <TextField id="bday" label="Birthday (mm/dd/yyyy)" variant="outlined" size="small" type="text" inputRef={birthdayRef} sx={{marginLeft: 2}}/>

            <InputLabel id="teacher" sx={{marginLeft: 2, marginTop: 1}}>Teacher</InputLabel>
            <Select labelId="teacher" id="teacher" label="Teacher" value={teacher} size="small" onChange={handleSelect} sx={{marginLeft: 1}}>
                {props.teachers.map((teacher) => <MenuItem value={teacher.name}>{teacher.name}</MenuItem>)}
            </Select>
            <Button variant="outlined" type="submit" sx={{marginLeft: 2}}>Add New Student</Button>
        </Box>
        </form>
        </div>
    )

}

export default NewStudent;