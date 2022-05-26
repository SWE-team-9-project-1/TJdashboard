import './classpage.css';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Roster from './Roster';
import { Box } from '@mui/material';
import ClassStats from './ClassStats';

function ClassPage(props) {
    const [clazz, setClazz] = useState(null);

    useEffect(() => {
        getDoc(props.selectedClassPage).then(dc => {
            setClazz({
                ...dc.data(),
                doc: dc
            });
        });
    }, []);

    if (clazz == null) {
        return (<></>);
    }

    const numStudents = Object.keys(clazz.scores).length;

    return (<>
        <Box id='class-page-container'>
            <Box id='roster-container'>
                <Roster
                    db={props.db}
                    selectedClassPage={props.selectedClassPage}
                    clazz={clazz}
                    setClazzScores={newScores => {
                        updateDoc(doc(props.db, 'classes', clazz.doc.id), {
                            scores: newScores
                        });
                        setClazz({
                            gradeLevel: clazz.gradeLevel,
                            scores: newScores,
                            doc: clazz.doc
                        });
                    }}
                />
            </Box>
            <Box id='class-stats-container'>
                <ClassStats
                    gradeLevel={clazz.gradeLevel}
                    numStudents={numStudents}
                    avgScore={Math.round(Object.values(clazz.scores).reduce((psum, elt) => psum + elt, 0) / numStudents)}
                />
            </Box>
        </Box>
    </>)
}

export default ClassPage;