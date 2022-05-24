import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function StudentDirectory(props) {
    const db = props.db;
    const [data, setData] = useState([[]]);
    
    useEffect(() => {
        const students = [];
    })

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
    </table>
    </>
    );
}

export default StudentDirectory;