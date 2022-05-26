import { collection,addDoc } from "firebase/firestore";
import { useRef} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

const NewTeacher = (props) => {
    const nameRef = useRef();
    const yearsRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const years = yearsRef.current.value;
        addDoc(collection(props.db, "teachers"), {
            name: name,
            years_taught: years,
            class: null
        })
        
        document.getElementById("name").value = '';
        document.getElementById("years").value = '';
        props.bigFunction();
    }
    
    return (
        <div style={{marginBottom: 20}}>
        <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row">
            <TextField id="name" label="Name" variant="outlined" size="small" type="text" inputRef={nameRef}/>
            <TextField id="years" label="# of Years Taught" variant="outlined" size="small" type="number" inputRef={yearsRef} sx={{marginLeft: 2}}/>
            <Button variant="outlined" type="submit" sx={{marginLeft: 2}}>Add New Teacher</Button>
        </Box>
        </form>
        </div>
    )

}

export default NewTeacher;