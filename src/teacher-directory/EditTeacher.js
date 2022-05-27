import { Button, Stack } from "@mui/material";

function EditTeacher(props) {
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
        </Stack>
    </>)
}

export default EditTeacher;