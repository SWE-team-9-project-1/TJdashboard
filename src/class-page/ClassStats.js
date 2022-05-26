import { Box, Card, Stack, Typography } from "@mui/material";

function gradeLevelSuffix(level) {
    if (level == 1) {
        return 'st';
    } else if (level == 2) {
        return 'nd';
    } else if (level == 3) {
        return 'rd';
    } else {
        return 'th';
    }
}

function ClassStats(props) {
    return (<>
        <Card
            id='class-stats'
        >
            <Stack
                direction='column'
                justifyContent='flex-start'
                spacing={3}
            >
                <Box>
                    <Typography
                        variant='h4'
                        color='text.secondary'
                    >Grade Level</Typography>
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='leftStart'
                    >
                        <Typography variant='h3'>{props.gradeLevel}</Typography>
                        <Typography variant='h5'>{gradeLevelSuffix(props.gradeLevel)}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography
                        variant='h4'
                        color='text.secondary'
                    >Number of Students</Typography>
                    <Typography variant='h3'>{props.numStudents}</Typography>
                </Box>
                <Box>
                    <Typography
                        variant='h4'
                        color='text.secondary'
                    >Average Grade</Typography>
                    <Typography variant='h3'>{props.avgScore}</Typography>
                </Box>
            </Stack>
        </Card>
    </>)
}

export default ClassStats;