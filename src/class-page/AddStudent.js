import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

function AddStudent(props) {
    const [studentList, setStudentList] = useState([]);
    const studentRef = useRef();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const q = query(
            collection(props.db, 'students'),
            where('class', '==', null)
        );

        getDocs(q).then(dcs => setStudentList(dcs.docs.map(dc => {
            return {
                label: dc.data().name,
                doc: dc
            };
        })))
    }, []);

    return (<>
        <Box>
            <Autocomplete
                disablePortal
                options={studentList}
                renderInput={(params) => <TextField {...params} error={isError} label='Name' inputRef={studentRef} />}
            />
            <Button
                onClick={() => {
                    const selected = studentList.filter(s => s.label === studentRef.current.value);
                    if (selected.length === 0) {
                        setIsError(true);
                        return;
                    } else {
                        setIsError(false);
                    }
                    props.add(selected[0].doc);
                    setStudentList(studentList.filter(s => s.label !== studentRef.current.value));
                }}
            >Add</Button>
        </Box>
    </>);
}

export default AddStudent;