import { React, useState, useEffect } from 'react'
import data from "./ListData.json"
import { collection, getDocs, doc, getDoc } from "firebase/firestore";



//figure out how to search for teachers and grade levels, possible a button that sets the state for the class component


const Class = (props) => {
    const [teacher, setTeacher] = useState([]);
    getDoc(doc(props.db, "teachers", props.data.teacher.id)).then((doc) => setTeacher(doc.data()["name"]))
    return (
        <>
            <tr>
                <td>{props.data.grade}</td>
                <td>{teacher}</td>
            </tr>
        </>
    )
}




function ClassList(props) {

    // ["class"].get().then(doc2 => console.log(doc2.data()
    const db = props.db


    //get class from teacher
    // const teach = ""
    // getDoc(doc(props.db, "students", "mE6ozwWnxCfZuyJUAqfE")).then((doc) => console.log(doc.data()["teacher"].id))
    const teachdoc = getDoc(doc(props.db, "teachers", "SMpMCG9BawhIuN5iKvVF")).then((doc) => console.log(doc.data()["class"].id))

    // getDoc(doc(props.db, "teachers", teach)).then((doc) => console.log(doc.data()["name"]))



    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const classes = [];
        getDocs(collection(props.db, "classes"))
            .then((allDocs) => {
                allDocs.forEach((doc) => classes.push(({ id: doc.id, ...doc.data() })))
                setClasses(classes);
            })
    }, [props.db])






    //search by teacher, grade, and student

    const filteredData = data.filter((big) => {
        if (props.input === '') {
            return big;
        } else {
            return big.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <>
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
            {classes.map((clazz) => <Class data={clazz} db={db} />)}
        </>
    );
}

export default ClassList