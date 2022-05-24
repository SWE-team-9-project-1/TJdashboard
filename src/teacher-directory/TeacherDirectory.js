import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

import * as React from 'react';
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


const Teacher = (props) => {
    return (
    <>
    <StyledTableRow key={props.data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell component="th" scope="row">{props.data.name}</StyledTableCell>
        <StyledTableCell align="right">{props.data.class}</StyledTableCell>
        <StyledTableCell align="right">{props.data.num_students}</StyledTableCell>
        <StyledTableCell align="right">{props.data.years_taught}</StyledTableCell>
    </StyledTableRow>
    </>
    )
}

function TeacherDirectory(props) {
    const db = props.db;
    const [teachers, setTeachers] = useState([]);
    
    useEffect(() => {
        const teachers = [];

        getDocs(collection(db, "teachers"))
        .then((allDocs) => {
            allDocs.forEach((doc) => teachers.push(({id: doc.id, ...doc.data() })) )
            setTeachers(teachers);
        })
    }, [db])

    return (
    <>
    <h2>Teacher Directory</h2>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
            <StyledTableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="right">Class Taught</StyledTableCell>
                <StyledTableCell align="right"># of Students</StyledTableCell>
                <StyledTableCell align="right"># Years Taught</StyledTableCell>
            </StyledTableRow>
        </TableHead>

        <TableBody>
            {teachers.map((teacher) => <Teacher data={teacher}/> )}
        </TableBody>
    </Table>
    </TableContainer>
    </>
    );
}

export default TeacherDirectory;