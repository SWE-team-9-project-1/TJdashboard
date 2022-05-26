import './classpage.css';
import AddIcon from '../plus.png';
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Student from "./Student";
import Teacher from "./Teacher";
import AddStudent from './AddStudent';

function addStudent(dc, props, state, setState) {
    const newStudents = [...state.students];
    newStudents.push({
        ...dc.data(),
        doc: dc
    });
    const newScores = {...props.clazz.scores};
    newScores[dc.id] = '';
    props.setClazzScores(newScores);
    updateDoc(doc(props.db, 'students', dc.id), {
        'class': doc(props.db, 'classes', props.clazz.doc.id)
    });
    setState({
        teacher: state.teacher,
        students: newStudents.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
    });
}

function setStudentScore(student, score, props, state, setState) {
    const newScores = {...props.clazz.scores};
    newScores[student.doc.id] = score;
    props.setClazzScores(newScores);
    setState({
        teacher: state.teacher,
        students: state.students
    });
}

function removeStudent(student, props, state, setState) {
    const newScores = {...props.clazz.scores};
    delete newScores[student.doc.id];
    props.setClazzScores(newScores);
    updateDoc(doc(props.db, 'students', student.doc.id), {
        'class': null
    });
    setState({
        teacher: state.teacher,
        students: state.students.filter(s => s.doc.id !== student.doc.id)
    });
}

function Roster(props) {
    const [state, setState] = useState({
        teacher: null,
        students: []
    });
    const [showAddStudent, setShowAddStudent] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const teacherQuery = query(
                collection(props.db, 'teachers'),
                where('class', '==', props.selectedClassPage)
            );
            const studentQuery = query(
                collection(props.db, 'students'),
                where('class', '==', props.selectedClassPage)
            );
            const teacherDocs = await getDocs(teacherQuery);
            const studentDocs = await getDocs(studentQuery);

            setState({
                teacher: {
                    ...teacherDocs.docs[0].data(),
                    doc: teacherDocs.docs[0]
                },
                students: studentDocs.docs.map(dc => {
                    return {
                        ...dc.data(),
                        doc: dc
                    };
                })
                .sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
            });
        };

        fetchData();
    }, []);

    return (<>
        <Stack
            direction='column'
            alignItems='center'
            spacing={2}
        >
            <Box
                
            >
                <Typography
                    variant='h4'
                >
                    Instructor
                </Typography>
                <Teacher name={state.teacher ? state.teacher.name : 'Teacher Unassigned'} />
            </Box>
            <Box>
                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-start'
                    alignItems='center'
                >
                    <Typography
                        variant='h4'
                    >
                        Students
                    </Typography>
                    <IconButton
                        onClick={() => setShowAddStudent(!showAddStudent)}
                    >
                        <img src={AddIcon} alt='add student' width={30} height={30} />
                    </IconButton>
                </Box>
                {
                    showAddStudent
                    ? <AddStudent
                        db={props.db}
                        add={dc => addStudent(dc, props, state, setState)}
                    />
                    : null
                }
                <Stack
                    direction='column'
                    alignItems='center'
                    spacing={1}
                >
                    {
                        state.students.map(student => <Student
                            key={student.doc.id}
                            name={student.name}
                            score={props.clazz.scores[student.doc.id]}
                            setScore={score => setStudentScore(student, score, props, state, setState)}
                            remove={() => removeStudent(student, props, state, setState)}
                        />)
                    }
                </Stack>
            </Box>
        </Stack>
    </>)
}

export default Roster;