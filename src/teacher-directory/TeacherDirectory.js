import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const Teacher = (props) => {
    return (
    <>
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.class}</td>
            <td>{props.data.num_students}</td>
            <td>{props.data.years_taught}</td>
        </tr>
    </>
    )
}

function TeacherDirectory(props) {
    const db = props.db;
    const [teachers, setTeachers] = useState([]);
    
    useEffect(() => {
        const teachers = [];

        getDocs(collection(db, "teachers"))
        .then((allDocs) => {
            allDocs.forEach((doc) => teachers.push(({id: doc.id, ...doc.data() })) )
            setTeachers(teachers);
        })
    }, [db])

    return (
    <>
    <table>
        <tr>
            <th>Name</th>
            <th>Class Taught</th>
            <th># of Students</th>
            <th># Years Taught</th>
        </tr>
        {teachers.map((teacher) => <Teacher data={teacher}/>)}
    </table>
    </>
    );
}

export default TeacherDirectory;