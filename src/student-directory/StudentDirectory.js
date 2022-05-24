import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


const Student = (props) => {
    const [teacherName, setTeacherName] = useState("");
    getDoc(doc(props.db, "teachers", props.data.teacher.id))
    .then((doc) => setTeacherName(doc.data().name));

    return (
    <>
    <StyledTableRow key={props.data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell component="th" scope="row">{props.data.name}</StyledTableCell>
        <StyledTableCell align="right">{props.data.grade}</StyledTableCell>
        <StyledTableCell align="right">{props.data.birthday}</StyledTableCell>
        <StyledTableCell align="right">{teacherName}</StyledTableCell>
    </StyledTableRow>
    </>
    )
}

function StudentDirectory(props) {
    const db = props.db;
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        const students = [];

        getDocs(collection(db, "students"))
        .then((allDocs) => {
            allDocs.forEach((doc) => students.push(({id: doc.id, ...doc.data() })) )
            setStudents(students);
        })
    }, [db])

    return (
    <>
    <h2>Student Directory</h2>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
            <StyledTableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="right">Grade</StyledTableCell>
                <StyledTableCell align="right">Birthday</StyledTableCell>
                <StyledTableCell align="right">Teacher</StyledTableCell>
            </StyledTableRow>
        </TableHead>

        <TableBody>
            {students.map((student) => <Student data={student} db={db}/> )}
        </TableBody>
    </Table>
    </TableContainer>
    </>
    );
}

export default StudentDirectory;