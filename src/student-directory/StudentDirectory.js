import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import NewStudent from './NewStudent.js';

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
    const [gradeLevel, setGradeLevel] = useState();

    useEffect(() => {
        if(props.data.class && props.data.class.id!=undefined) {
            // get grade level
            getDoc(props.data.class)
            .then((doc) => setGradeLevel(doc.data().gradeLevel));

            // get teacher
            const teacherQuery = query(
                collection(props.db, 'teachers'),
                where('class', '==', props.data.class)
            )
            getDocs(teacherQuery)
            .then((doc) => {
                doc.docs.length!==0 ? setTeacherName(doc.docs[0].data().name) : setTeacherName("N/A");
            });
        } else {
            setGradeLevel("Not assigned class");
            setTeacherName("Not assigned class");
        }
    }, [props.db])
    
    return (
    <>
    <StyledTableRow key={props.data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell component="th" scope="row" sx={{fontWeight: 'bold'}}>{props.data.name}</StyledTableCell>
        <StyledTableCell align="right">{gradeLevel}</StyledTableCell>
        {/* <StyledTableCell align="right">{new Date(props.data.birthday.seconds*1000).toDateString()}</StyledTableCell> */}
        <StyledTableCell align="right">{props.data.birthday}</StyledTableCell>
        <StyledTableCell align="right">{teacherName}</StyledTableCell>
    </StyledTableRow>
    </>
    )
}

function StudentDirectory(props) {
    const db = props.db;
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const bigFunction = () => {
        const students = [];
        getDocs(collection(db, "students"))
        .then((allDocs) => {
            allDocs.forEach((doc) => students.push(({id: doc.id, ...doc.data() })) )
            students.sort((a,b) => {
                return (a.name.split(" ")[1]).localeCompare(b.name.split(" ")[1]);
            })
            setStudents(students);
        })

        const teachers = [];
        getDocs(collection(db, "teachers"))
        .then((allDocs) => {
            allDocs.forEach((doc => teachers.push(({id: doc.id, ...doc.data() }))) )
            teachers.sort((a,b) => {
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
    {/* <div style={{float: "left"}}> */}
        <h1>Student Directory</h1>
    {/* </div> */}
    {/* <div style={{float: "right", marginTop: 25}}>
        <Button variant="outlined" onClick={addStudent}>Add New Student</Button>
    </div> */}

    <NewStudent teachers={teachers} db={db} bigFunction={bigFunction}/>
    
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
            {students.map((student) => <Student key={student.id} data={student} db={db}/> )}
        </TableBody>
    </Table>
    </TableContainer>
    </Box>
    </>
    );
}

export default StudentDirectory;