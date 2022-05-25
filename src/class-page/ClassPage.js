import './classpage.css';
import AddIcon from '../plus.png';
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Student from "./Student";
import Teacher from "./Teacher";
import AddStudent from './AddStudent';

function ClassPage(props) {
    const [state, setState] = useState({
        clazz: null,
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
            const clazz = await getDoc(props.selectedClassPage);
            const teacherDocs = await getDocs(teacherQuery);
            const studentDocs = await getDocs(studentQuery);

            setState({
                clazz: {
                    ...clazz.data(),
                    doc: clazz
                },
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
            });
        };

        fetchData();
    }, []);

    if (state.clazz == null) {
        return (<></>);
    }

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
                        add={dc => {
                            console.log(dc, dc.id);
                            const newStudents = [...state.students];
                            newStudents.push({
                                ...dc.data(),
                                doc: dc
                            });
                            const newScores = {...state.clazz.scores};
                            newScores[dc.id] = '';
                            updateDoc(doc(props.db, 'students', dc.id), {
                                'class': `classes/${state.clazz.id}`
                            });
                            updateDoc(doc(props.db, 'classes', state.clazz.doc.id), {
                                scores: newScores
                            });
                            setState({
                                clazz: {
                                    doc: state.clazz.doc,
                                    scores: newScores
                                },
                                teacher: state.teacher,
                                students: newStudents
                            });
                        }}
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
                            score={state.clazz.scores[student.doc.id]}
                            setScore={score => {
                                const newScores = {...state.clazz.scores};
                                newScores[student.doc.id] = score;
                                updateDoc(doc(props.db, 'classes', state.clazz.doc.id), {
                                    scores: newScores
                                });
                                setState({
                                    clazz: {
                                        doc: state.clazz.doc,
                                        scores: newScores
                                    },
                                    teacher: state.teacher,
                                    students: state.students
                                });
                            }}
                            remove={() => {
                                const newScores = {...state.clazz.scores};
                                delete newScores[student.doc.id];
                                updateDoc(doc(props.db, 'classes', state.clazz.doc.id), {
                                    scores: newScores
                                });
                                updateDoc(doc(props.db, 'students', student.doc.id), {
                                    'class': null
                                });
                                setState({
                                    clazz: {
                                        doc: state.clazz.doc,
                                        scores: newScores
                                    },
                                    teacher: state.teacher,
                                    students: state.students.filter(s => s.doc.id !== student.doc.id)
                                });
                            }}
                        />)
                    }
                </Stack>
            </Box>
        </Stack>
    </>)
}

export default ClassPage;