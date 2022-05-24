import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function StudentDirectory(props) {
    const db = props.db;
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const data = [];

        getDocs(collection(db, "students"))
        .then((allDocs) => {
            allDocs.forEach((doc) => data.push(({id: doc.id, ...doc.data() })) )

            setData(data);
        })

    }, [])

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