import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { useNavigate} from "react-router-dom";
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

const AddTask = () => {
  const theme = createTheme();

  const [user, setUser] = useState("")
  const [startTime, setStartTime] = useState(moment().format());
  const [endTime, setEndTime] = useState(moment().format());

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('user'))
    if (local == null) {
      console.log("user tokenia ei lötynyt");
    } else {
      userService.checkUserToken(local.token)
        .then(response => {
          console.log(response)
          setUser(response)
        }
        )
        .catch(error => {
          console.log(error);
        })
      console.log("user", user)
    }
  }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    const newTask = {
      name: details.name,
      description: details.description,
      userId: user,
      startTime: startTime,
      endTime: endTime
    }
    event.preventDefault();
    console.log(details);
    axios.post(`http://[::1]:3000/tasks`, newTask)
      .then(response => {
        console.log(response);
        alert("Tehtävä lisätty");
        navigate(`/tasks`, { replace: true })
      }).catch(error => console.log(error))
  }


  let navigate = useNavigate()

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
            Lisää Tehtävä
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
                  autoFocus
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
                    label="Loppuu"
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
              Lisää
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  )
}

export default AddTask

