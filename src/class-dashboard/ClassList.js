import { React, useState, useEffect } from 'react'
import data from "./ListData.json"
import { collection, getDocs, doc, getDoc } from "firebase/firestore";






const Class = (props) => {
    return (
        <>
            <tr>
                <td>{props.data.grade}</td>
                <td>{console.log(props.data.teacher)}</td>
                {/* <td>{props.data.teacher}</td> */}
                {/* <td>{props.data.students}</td> */}
            </tr>
        </>
    )
}




function ClassList(props) {



    getDoc(doc(props.db, "teachers", "SMpMCG9BawhluN5iKvVF")).then((doc) => console.log(doc.data()))



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
            {classes.map((clazz) => <Class data={clazz} />)}
        </>
    );
}

export default ClassList