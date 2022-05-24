import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import ClassList from "./ClassList";




function ClassDashboard(props) {



    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };





    return (
        <div className="main">
            <h1>Class Dashboard</h1>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            <ClassList db={props.db} input={inputText} />
        </div>
    );
}

export default ClassDashboard;