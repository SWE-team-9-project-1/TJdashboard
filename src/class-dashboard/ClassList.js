import { React, useState } from 'react'
import data from "./ListData.json"
import { collection, getDocs } from "firebase/firestore";


function ClassList(props) {

    const classdata = []
    getDocs(collection(props.db, "classes")).then((allDocs) => { allDocs.forEach((doc) => classdata.push(doc)) })

    console.log(classdata)



    //search by teacher, grade, and student

    const filteredData = data.filter((big) => {
        if (props.input === '') {
            return big;
        } else {
            return big.text.toLowerCase().includes(props.input)
        }
    })
    return (

        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    );
}

export default ClassList