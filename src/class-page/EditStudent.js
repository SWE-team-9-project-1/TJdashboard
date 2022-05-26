import { Button, Stack } from "@mui/material";

function EditStudent(props) {
    return (<>
        <Stack
            direction='row'
            spacing={1}
            className='edit-student-button-stack'
        >
            <Button
                onClick={() => props.onSave()}
                variant='contained'
            >
                Save Changes
            </Button>
            <Button
                onClick={() => props.onDiscard()}
                variant='contained'
            >
                Discard Changes
            </Button>
            <Button
                onClick={() => props.onRemove()}
                variant='contained'
            >
                Remove From Class
            </Button>
        </Stack>
    </>)
}

export default EditStudent;