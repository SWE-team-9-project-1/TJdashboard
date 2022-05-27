import { collection, getDocs, doc, getDoc, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import Gear from './gear.png';

import * as React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import NewTeacher from './NewTeacher.js';
import EditTeacher from './EditTeacher.js'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Teacher = (props) => {
    const [studentList, setStudentList] = useState([]);
    const [gradeLevel, setGradeLevel] = useState("");
    const [editing, setEditing] = useState(false);
    const nameRef = useRef();
    const yearsRef = useRef();
    const setName = (name, years) => {
        updateDoc(doc(props.db, "teachers", props.data.id), {
            name: name,
            years_taught: years
        });
        props.bigFunction()

    }
    useEffect(() => {

        if (props.data.class) {
            // get students
            const studentList = [];

            const studentQuery = query(
                collection(props.db, 'students'),
                where('class', '==', props.data.class)
            )
            getDocs(studentQuery)
                .then((doc) => {
                    doc.docs.forEach((studentDoc) => studentList.push(studentDoc.data().name))
                    studentList.sort((a, b) => {
                        return (a.split(" ")[1]).localeCompare(b.split(" ")[1]);
                    })
                    setStudentList(studentList);
                })

            // get grade level
            getDoc(props.data.class)
                .then((doc) => setGradeLevel(doc.data().gradeLevel));
        } else {
            setGradeLevel("Not assigned class")
        }
    }, [props.db])


    const [open, setOpen] = useState(false);
    return (
        <>
            <StyledTableRow key={props.data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>{props.data.name}</StyledTableCell>
                <StyledTableCell align="right">{gradeLevel}</StyledTableCell>
                <StyledTableCell align="right">
                    <ExpandStudents studentList={studentList} open={open} setOpen={setOpen} />
                </StyledTableCell>
                <StyledTableCell align="right">{props.data.years_taught}</StyledTableCell>
                <StyledTableCell align="right">

                    <IconButton
                        onClick={() => setEditing(!editing)}>
                        <img src={Gear} width={25} height={25} />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            deleteDoc(doc(props.db, 'teachers', props.data.id));
                            props.bigFunction();
                        }}
                    >
                        Remove
                    </Button>

                </StyledTableCell>

            </StyledTableRow>
            <StyledTableRow>{editing && <p></p>}{editing && <TextField label={"Name"} defaultValue={props.data.name} inputRef={nameRef}></TextField>}{editing && <TextField label={"Years Taught"} defaultValue={props.data.years_taught} inputRef={yearsRef}></TextField>}{editing && <EditTeacher
                onSave={() => {
                    setName(nameRef.current.value, yearsRef.current.value);
                    setEditing(false);
                    props.bigFunction();
                }}
                onDiscard={() => {
                    setEditing(false);
                }}
            ></EditTeacher>}


                {/* <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='flex-start'
                minHeight={60}
            >
                    <Typography variant='h5'>Grade:&nbsp;</Typography> {
                        editing
                            ? <TextField
                                className='Change Name'
                                defaultValue={nameRef.current.value}
                                inputRef={nameRef}
                            />
                            : <Typography
                                variant='h5'
                            >
                                {nameRef.current.value}
                            </Typography>
                    }
                </Box> */}


            </StyledTableRow>
        </>
    )
}

const ExpandStudents = (props) => {
    return (
        <>
            <IconButton aria-label="expand row" size="small" onClick={() => props.setOpen(!props.open)}>
                {props.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

            <Collapse in={props.open} timeout="auto" unmountOnExit>
                {props.studentList.map((name) => <p key={name} style={{ lineHeight: '.3' }}>{name}</p>)}
            </Collapse>
        </>
    )
}

function TeacherDirectory(props) {
    const db = props.db;
    const [teachers, setTeachers] = useState([]);


    const bigFunction = () => {
        const teachers = [];

        getDocs(collection(db, "teachers"))
            .then((allDocs) => {
                allDocs.forEach((doc) => teachers.push(({ id: doc.id, ...doc.data() })))
                teachers.sort((a, b) => {
                    return (a.name.split(" ")[1]).localeCompare(b.name.split(" ")[1]);
                })
                setTeachers(teachers);
            })
    }

    useEffect(() => {
        bigFunction();
    }, [db])

    return (
        <>
            <Box sx={{ mx: "2em" }}>
                <h1>Teacher Directory</h1>
                <NewTeacher bigFunction={bigFunction} db={db} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="right">Grade Taught</StyledTableCell>
                                <StyledTableCell align="right">Students</StyledTableCell>
                                <StyledTableCell align="right"># Years Taught</StyledTableCell>
                                <StyledTableCell align="right">Remove Teacher</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {teachers.map((teacher) => <Teacher key={teacher.id} data={teacher} db={db} bigFunction={bigFunction} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default TeacherDirectory;