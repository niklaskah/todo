import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TaskService from "../services/TaskService"
import { Link } from "react-router-dom"

const AddTask = ({ user }) => {
  const theme = createTheme();
  //Connect to mongodb using user prop from App
  const mongo = user.mongoClient("mongodb-atlas");
  const collection = mongo.db("todoDB").collection("task");

  //Set usestates for tracking time for  materialui calendar component
  const [startTime, setStartTime] = useState(moment().format());
  const [endTime, setEndTime] = useState(moment().format());
//handler for name and details
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    console.log("user.id",user.id);
    const newTask = {
      name: details.name,
      description: details.description,
      userId: user.id,
      startTime: startTime,
      endTime: endTime,
      spentTime: 0
    }
    event.preventDefault();
    console.log(details);
    TaskService.addTask(collection, newTask)
      .then(response => {
        console.log(response);
        navigate(`/tasks`, { replace: true })
      })
      .catch(error => console.log(error))
  }

//navigation component for when task submission succeeds
  let navigate = useNavigate()
// usestate for tracking task data
  const [details, setDetails] = useState([])

  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Add task
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  name='name'
                  label="Task name"
                  value={details.name || ""}
                  onChange={handleChange}
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  name='description'
                  label="Task description"
                  fullWidth
                  value={details.description || ""}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    label="Start"
                    name="startTime"
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue.format())
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    label="End"
                    name="endTime"
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue.format())
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add task
            </Button>
            <Button component={Link} to="/tasks"
              fullWidth
              variant="contained"
              sx={{mb: 2 }}
            >Go back</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  )
}

export default AddTask

