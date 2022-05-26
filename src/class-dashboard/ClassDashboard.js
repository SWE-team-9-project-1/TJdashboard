import { React, useState, useRef, useEffect } from "react";
import { collection, getDocs, doc, getDoc, query, where, addDoc, setDoc } from "firebase/firestore";
import { Box, Paper, Stack, Card, TextField, Button, Autocomplete, Divider } from '@mui/material';
import ClassList from "./ClassList";
import Class from "./Class"




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
    const classSearchRef = useRef();
    const [classAdded, setClassAdded] = useState(true)

    useEffect(() => {
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
    }





    const classdisplay = {};



    classes.forEach(element => {
        classdisplay[element.id] = "No Assigned Teacher"
    })
    teacherlist.forEach(element => {
        classdisplay[element.class._key.path.segments[6]] = element.label;
    })

    const searchdisplay = {};
    for (const [key, value] of Object.entries(classdisplay)) {
        classes.forEach(x => {
            if (key === x.id) {
                searchdisplay[key] = (value + "   (Grade" + x.gradeLevel + ")")
            }
        })
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
                        onClick={() => addClassToDatabase(teacherRef.current.value, parseInt(gradelevel.current.value), teacherlist)}
                    >Add</Button>
                </Box>}

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
            <Stack
                // direction='column'
                alignItems='stretch'
                spacing={1}
                justifyContent="flex-start"


            >
                {classes.filter((clazz) => searchdisplay[clazz.id].toLowerCase().includes(inputText)).map((clazz) => <Class
                    key={clazz.id}
                    data={clazz}
                    db={props.db}
                    setSelectedClassPage={props.setSelectedClassPage}
                    teachers={teacherlist}
                    classes={classdisplay}
                // names={disp}
                />)}

            </Stack>

        </div>

    );
}

export default ClassDashboard;