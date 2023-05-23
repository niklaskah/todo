import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
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
import * as Realm from "realm-web"

const {
  BSON: { ObjectId },
} = Realm;

const EditTask = ({ user }) => {
  const theme = createTheme();
  const mongo = user.mongoClient("mongodb-atlas");
  const collection = mongo.db("todoDB").collection("task");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("nimi ", typeof (name));
    setDetails(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(details);
    TaskService.updateTask(collection, details._id, details)
      .then(response => {
        console.log(response);
        navigate(`/tasks`, { replace: true })
      })
      .catch(error => console.log(error))
  }

  const params = useParams()

  let navigate = useNavigate()

  const [details, setDetails] = useState([])

  useEffect(() => {
    const taskid = ObjectId(params.id)
    TaskService.getById(collection, taskid)
      .then(response => {
        console.log(response);
        setDetails(response)
        setStartTime(details.startTime)
        setEndTime(details.endTime)
      })
      .catch(error => console.log(error))
  }, [])

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
            Muuta Tehtävää
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  name='name'
                  label="Tehtävän nimi"
                  value={details.name || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  name='description'
                  label="Tehtävän kuvaus"
                  fullWidth
                  value={details.description || ""}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    label="Alkaa"
                    name="startTime"
                    value={details.startTime}
                    onChange={(newValue) => {
                      setDetails(values => ({ ...values, ["startTime"]: newValue.format() }))
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    label="Loppuu"
                    name="endTime"
                    value={details.endTime}
                    onChange={(newValue) => {
                      setDetails(values => ({ ...values, ["endTime"]: newValue.format() }))
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
              Tallenna
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  )
}

export default EditTask

