import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Container, Button } from '@mui/material';


export default function Student() {

    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto", textAlign: 'center' }
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [student, setStudent] = useState([]);
    const handeClick = (e) => {
        e.preventDefault()
        const student = { address, name }
        //console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then((response) => {
            //console.log("New Student Added");
            if (response.status === 200) {
                console.log('New Student Added');
            }

        })



    }
    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudent(result);
            })
    })

    return (
        <Container>

            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: 'blue', textAlign: 'center' }} ><u>Add Student</u></h1>
                <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }} noValidateautoComplete="off">
                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                    <Button variant="contained" onClick={handeClick}>Submit</Button>
                </Box>
            </Paper>
            <h1 style={{ textAlign: "center" }}>Students</h1>
            <Paper elevation={3} style={paperStyle}>
                {student.map(student => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                        Id:{student.id}<br />
                        Name:{student.name} <br />
                        Address:{student.address}
                    </Paper>
                ))}
            </Paper>
        </Container >
    );
}
