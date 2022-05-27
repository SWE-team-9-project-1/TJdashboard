import { Button, Stack, TextField} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";

const EditStudent = (props) => {
    const nameRef = useRef();
    const bdayRef = useRef();

    const onSave = () => {
        updateDoc(doc(props.db, "students", props.data.id),{
            name: nameRef.current.value,
            birthday: bdayRef.current.value
        })
        props.setEditing(false);
        props.bigFunction();
    }

    return(
    <>
        <p></p>
        <TextField label="Name" size="small" defaultValue={props.data.name} inputRef={nameRef}/>
        <TextField label="Birthday (mm/dd/yyyy)" size="small" defaultValue={props.data.birthday} inputRef={bdayRef} />
        <Stack
            direction='row'
            spacing={1}
            className='edit-student-button-stack'
        >
            <Button variant="contained" onClick={onSave}>Save Changes</Button>
            <Button variant="contained" onClick={() => props.setEditing(false)}>Discard Changes</Button>

        </Stack>
    </>
    )

}


export default EditStudent;