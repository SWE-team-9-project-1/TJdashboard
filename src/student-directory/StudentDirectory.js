import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const Student = (props) => {
    return (
    <>
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.grade}</td>
            <td>{props.data.birthday}</td>
            <td>{props.data.teacher}</td>
            <td>{props.data.class}</td>
        </tr>
    </>
    )
}

function StudentDirectory(props) {
    const db = props.db;
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        const students = [];

        getDocs(collection(db, "students"))
        .then((allDocs) => {
            allDocs.forEach((doc) => students.push(({id: doc.id, ...doc.data() })) )
            setStudents(students);
        })
    }, [db])

    return (
    <>
    <table>
        <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Birthday</th>
            <th>Teacher</th>
            <th>Class</th>
        </tr>
        {students.map((student) => <Student data={student}/>)}
    </table>
    </>
    );
}

export default StudentDirectory;