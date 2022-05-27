import { Autocomplete, Box, Button, Card, TextField, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

function Teacher(props) {
    const [teachers, setTeachers] = useState([]);
    const teacherRef = useRef();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (props.name) {
            return;
        }

        const teacherQuery = query(
            collection(props.db, 'teachers'),
            where('class', '==', null)
        );

        getDocs(teacherQuery).then(docs => {
            setTeachers(docs.docs.map(dc => {
                return {
                    label: dc.data().name,
                    doc: dc
                };
            }))
        })
    }, []);

    return (<>
        <Card
            className='class-page-card'
        >
            <Box
                className='info-wrapper'
            >
                <Box
                    className='inner-info-wrapper'
                >
                    <Typography
                        variant='h3'
                    >
                        {props.name ? props.name : 'Teacher Unassigned'}
                    </Typography>
                </Box>
                {
                    props.name
                    ? <></>
                    : <Box>
                        <Autocomplete
                            disablePortal
                            options={teachers}
                            renderInput={(params) => <TextField
                                {...params}
                                error={isError}
                                label='Name'
                                inputRef={teacherRef}
                                sx={{ minWidth: '20em' }}
                            />}
                            isOptionEqualToValue={(opt, val) => opt.label === val.label}
                            onChange={(_, value) => teacherRef.current = value}
                        />
                        <Button
                            id='add-teacher-button'
                            variant='contained'
                            onClick={() => {
                                const selected = teachers.filter(s => s.doc.id === teacherRef.current.doc.id);
                                if (selected.length === 0) {
                                    setIsError(true);
                                    return;
                                } else {
                                    setIsError(false);
                                }
                                props.setTeacher(selected[0].doc);
                                setTeachers(teachers.filter(s => s.doc.id !== teacherRef.current.doc.id));
                            }}
                        >Assign to Class</Button>
                    </Box>
                }
            </Box>
        </Card>
    </>)
}

export default Teacher;