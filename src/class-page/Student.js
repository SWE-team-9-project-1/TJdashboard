import Gear from './gear.png';
import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import { useRef, useState } from 'react';
import EditStudent from './EditStudent';

function Student(props) {
    const [editing, setEditing] = useState(false);
    const scoreRef = useRef();

    return (<>
        <Card
            className='class-page-card'
        >
            <Box
                className='info-wrapper'
            >
                <Box className='inner-info-wrapper'>
                    <Typography
                        variant='h3'
                    >
                        {props.name}
                    </Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='flex-start'
                        minHeight={60}
                    >
                        <Typography variant='h5'>Grade:&nbsp;</Typography> {
                            editing
                                ? <TextField
                                    className='enter-score'
                                    defaultValue={props.score}
                                    inputRef={scoreRef}
                                />
                                : <Typography
                                    variant='h5'
                                >
                                    {props.score}
                                </Typography>
                        }
                    </Box>
                </Box>
                {editing ? <EditStudent
                    onSave={() => {
                        props.setScore(Number(scoreRef.current.value));
                        setEditing(false);
                    }}
                    onDiscard={() => {
                        setEditing(false);
                    }}
                    onRemove={() => {
                        props.remove();
                        setEditing(false);
                    }}
                /> : null}
            </Box>
            <Box
                className='edit-button-wrapper'
            >
                <Box
                    className='edit-button-container'
                >
                    <IconButton
                        onClick={() => setEditing(true)}
                    >
                        <img src={Gear} width={40} height={40} />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    </>);
}

export default Student;