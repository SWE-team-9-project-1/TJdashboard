import { React, useState, useRef, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, addDoc } from "firebase/firestore";
import { Box, Paper, Stack, Card, TextField, Button, Autocomplete } from '@mui/material';
import ClassList from "./ClassList";




function ClassDashboard(props) {



    const [inputText, setInputText] = useState("");
    let inputHandler = () => {
        //convert input text to lower case
        var lowerCase = searchbar.current.value.toLowerCase();
        setInputText(lowerCase);
    };


    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const classes = [];
        getDocs(collection(props.db, "classes"))
            .then((allDocs) => {
                allDocs.forEach((doc) => classes.push(({ id: doc.id, ...doc.data() })))
                setClasses(classes);
            })
    }, [props.db]);


    const searchbar = useRef();
    const [addClass, setAddClass] = useState(false);
    const gradelevel = useRef();
    const [teacherlist, setTeacherlist] = useState([]);
    const teacherRef = useRef();


    useEffect(() => {
        const q = query(
            collection(props.db, 'teachers'),
        );
        getDocs(q).then(dcs => setTeacherlist(dcs.docs.map(dc => {
            return {

                label: dc.data().name,
                id: dc.id
            };

        })))
    }, []);





    const addClassToDatabase = async (name, grade) => {

        let adddocfunction = await addDoc(collection(props.db, "classes"), {
            gradeLevel: grade,
            scores: {}
        })
        //need the teachers id and i think that is from the use effect right above inside the return is an id field
        setDoc(doc(props.db, teachers, chosenID), {
            property: value,
        });

        console.log(adddocfunction._key.path.segments[0])
        console.log(adddocfunction._key.path.segments[1])



    }

    return (
        <div className="main">
            <Box>
                <h1>Classes {<Button onClick={() => setAddClass(true)}>+</Button>}</h1>
                {addClass && <Box>
                    <Autocomplete
                        disablePortal
                        options={teacherlist}
                        renderInput={(params) => <TextField {...params} label="Teacher's name" inputRef={teacherRef} />}
                    />
                    <p> </p>
                    <TextField inputRef={gradelevel} label="Grade Level"></TextField>
                    <Button
                        onClick={() => addClassToDatabase(teacherRef.current.value, gradelevel.current.value)}
                    >Add</Button>
                </Box>}

                {/* {addClass && <p>Teacher's Name</p>}
                {addClass && <TextField inputRef={teacheradd}>Teacher's Name</TextField>}
                {addClass && <p>Grade Level</p>}
                {addClass && <TextField inputRef={gradelevel}>Grade Level</TextField>}
                {addClass && <Button onClick={() => addClassToDatabase(teacheradd.current.value, gradelevel.current.value)}>Submit</Button>} */}
            </Box>

            <div className="search">
                <p> </p>
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                    inputRef={searchbar}
                />

            </div>
            <ClassList db={props.db} input={inputText} classes={classes} />
            <Box component="form">I AM A BOX</Box>
        </div>

    );
}

export default ClassDashboard;