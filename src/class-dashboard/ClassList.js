import { React, useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { Box, Paper, Stack, Card } from '@mui/material';
import { Link } from 'react-router-dom';




//figure out how to search for teachers and grade levels, possible a button that sets the state for the class component

//This triggers a parent to rerender which triggers this to rerender, figure this shit out
const Class = (props) => {
    const [toDisplay, setToDisplay] = useState(true)
    // const truthstatement = false;
    // for (const [key, value] of Object.entries(props.names)) {
    //     // if (key == props.data.id) {
    //     //     setToDisplay(true);
    //     // }
    // }
    // setToDisplay(truthstatement)
    return (
        <>

            {toDisplay && <Card>
                <Box onClick={() => props.setSelectedClassPage(props.data.id)}>
                    <Link to="/" className='nav-link'>
                        {props.data.gradeLevel}{props.data.id}
                    </Link>

                </Box>

            </Card>}


        </>
    )
}




function ClassList(props) {

    // ["class"].get().then(doc2 => console.log(doc2.data()
    const db = props.db


    //get class from teacher
    // const teach = ""
    // getDoc(doc(props.db, "students", "mE6ozwWnxCfZuyJUAqfE")).then((doc) => console.log(doc.data()["teacher"].id))
    // const teachdoc = getDoc(doc(props.db, "teachers", "SMpMCG9BawhIuN5iKvVF")).then((doc) => console.log(doc.data()["class"].id))

    // getDoc(doc(props.db, "teachers", teach)).then((doc) => console.log(doc.data()["name"]))


    const teacherQuery =
        props.classes.forEach(element => query(
            collection(props.db, 'teachers'),
            where('class', '==', element.id)
        ))

    const [displayed, setDisplayed] = useState([]);
    const [names, setNames] = useState([]);
    props.classes.forEach(element => console.log(element.id));

    useEffect(() => {
        const fetchData = async () => {

            const teacherQuery = query(
                collection(props.db, 'teachers')
            );
            const teacherDocs = await getDocs(teacherQuery);


            const teacherNames = {};
            teacherDocs.forEach(element => teacherNames[element._document.data.value.mapValue.fields.class.referenceValue.slice(-20)] = element._document.data.value.mapValue.fields.name.stringValue);










            // setDisplayed({
            //     ...teacherDocs.docs[0].data(),
            //     doc: teacherDocs.docs[0]
            // });

            setNames(teacherNames)

        };
        fetchData();
    }, []);
    const disp = {};
    for (const [key, value] of Object.entries(names)) {
        if (value.toLowerCase().indexOf(props.input.toLowerCase()) > -1) {
            disp[key] = value;
        }
    }
    // setDisplayed(disp)

    //search by teacher, grade, and student


    return (
        <>
            <Stack
                // direction='column'
                alignItems='left'
                spacing={1}
            >
                {props.classes.map((clazz) => <Class key={clazz.id} data={clazz} db={db} input={props.input} names={disp} />)}

            </Stack>


        </>
    );
}

export default ClassList