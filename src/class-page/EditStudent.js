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
            >
                Save Changes
            </Button>
            <Button
                onClick={() => props.onDiscard()}
            >
                Discard Changes
            </Button>
            <Button
                onClick={() => props.onRemove()}
            >
                Remove From Class
            </Button>
        </Stack>
    </>)
}

export default EditStudent;