import { Box, Card, Typography } from "@mui/material";

function Teacher(props) {
    return (<>
        <Card
            className='class-page-card'
        >
            <Box
                className='info-wrapper'
            >
                <Typography
                    variant='h3'
                >
                    {props.name}
                </Typography>
            </Box>
        </Card>
    </>)
}

export default Teacher;