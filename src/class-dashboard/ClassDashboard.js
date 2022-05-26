import './class-dashboard.css';
import { React, useState, useRef, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { Box, Paper, Stack, Card, TextField, Button, Autocomplete, Divider, IconButton } from '@mui/material';
import ClassList from "./ClassList";
import Class from "./Class"
import AddIcon from '../plus.png';





function ClassDashboard(props) {
    const [inputText, setInputText] = useState("");
    let inputHandler = () => {
        //convert input text to lower case
        var lowerCase = searchbar.current.value.toLowerCase();
        setInputText(lowerCase);
    };


    const [classes, setClasses] = useState([]);
    const bigFunction = () => {
        const classes = [];
        getDocs(collection(props.db, "classes"))
            .then((allDocs) => {
                allDocs.forEach((doc) => classes.push(({ id: doc.id, ...doc.data(), doc: doc })))
                setClasses(classes);
            })
    }
    useEffect(() => {
        bigFunction()
    }, [props.db]);




    const searchbar = useRef();
    const [addClass, setAddClass] = useState(false);
    const gradelevel = useRef();
    const [teacherlist, setTeacherlist] = useState([]);
    const teacherRef = useRef();
    const [studentlist, setStudentlist] = useState([]);



    const littleFunction = () => {

        const q = query(
            collection(props.db, 'teachers'),
        );
        getDocs(q).then(dcs => setTeacherlist(dcs.docs.map(dc => {
            return {

                label: dc.data().name,
                id: dc.id,
                years_taught: dc.data().years_taught,
                class: dc.data().class
            };

        })))

        setAddClass(false)


    }

    const studentFunction = () => {
        const q = query(
            collection(props.db, 'students'),
        );
        getDocs(q).then(dcs => setStudentlist(dcs.docs.map(dc => {
            return {

                label: dc.data().name,
                id: dc.id,
                class: dc.data().class
            };

        })))
    }

    useEffect(() => {
        littleFunction();
        studentFunction();
    }, []);

    const addClassToDatabase = async (name, grade, list) => {

        let adddocvar = await addDoc(collection(props.db, "classes"), {
            gradeLevel: grade,
            scores: {}
        })
        //need the teachers id and i think that is from the use effect right above inside the return is an id field       "/" + adddocvar._key.path.segments[0] + "/" + adddocvar._key.path.segments[1]
        list.forEach(element => {
            if (element.label === name) {
                setDoc(doc(props.db, "teachers", element.id), {
                    class: adddocvar,
                    name: element.label,
                    years_taught: element.years_taught
                });
            }
        })
        bigFunction()

        littleFunction()

    }






    const classdisplay = {};



    classes.forEach(element => {
        classdisplay[element.id] = "No Assigned Teacher"
    })
    teacherlist.forEach(element => {
        if (element.class !== null) {
            classdisplay[element.class._key.path.segments[6]] = element.label;
        }
    })

    console.log(Object.entries(classdisplay));

    const searchdisplay = {};
    for (const [key, value] of Object.entries(classdisplay)) {
        classes.forEach(x => {
            if (key === x.id) {
                searchdisplay[key] = (value + "   (Grade" + x.gradeLevel + ")")
            }
        })
    }

    return (
        <div id="main">
            <Box>
                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-start'
                    alignItems='center'
                >
                    <Typography
                        variant='h3'
                    >
                        Classes
                    </Typography>
                    <IconButton onClick={() => setAddClass(!addClass)}>
                        <img src={AddIcon} alt='add student' width={35} height={35} />
                    </IconButton>
                </Box>
                {addClass && <Stack
                    className='search'
                    id='add-class'
                    direction='column'
                    spacing={1}
                >
                    <Autocomplete
                        disablePortal
                        options={teacherlist}
                        renderInput={(params) => <TextField
                            sx={{
                                width: '30vw'
                            }}
                            {...params}
                            label="Teacher's name"
                            inputRef={teacherRef}
                        />}
                    />
                    <TextField inputRef={gradelevel} label="Grade Level"></TextField>
                    <Button
                        onClick={() => addClassToDatabase(teacherRef.current.value, parseInt(gradelevel.current.value), teacherlist)}
                        variant='contained'
                    >Add
                    </Button>
                </Stack>}

            </Box>

            <div
                className="search"
            >
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
            <p> </p>

            <Stack
                alignItems='stretch'
                spacing={2}
                justifyContent="flex-start"
            >
                {classes.filter((clazz) => searchdisplay[clazz.id].toLowerCase().includes(inputText)).map((clazz) => <Class
                    key={clazz.id}
                    data={clazz}
                    db={props.db}
                    setSelectedClassPage={props.setSelectedClassPage}
                    teachers={teacherlist}
                    classes={classdisplay}
                    students={studentlist}
                // load1={bigFunction()}
                // load2={littleFunction()}
                // load3={studentFunction()}
                // names={disp}
                />)}

            </Stack>

        </div>

    );
}

export default ClassDashboard;