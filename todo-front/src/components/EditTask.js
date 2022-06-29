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

const EditTask = () => {
  const theme = createTheme();

  const [startTime, setStartTime] = useState(moment().format());
  const [endTime, setEndTime] = useState(moment().format());


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(details);
    axios.request({
      method:"patch",
      url:`http://[::1]:3000/tasks/${details.id}`,
      data: details
    }).then(response => {
      alert("Muutokset tallennettu");
      navigate(`/tasks`,  { replace: true })
    })
  }

  const params = useParams()

  let navigate = useNavigate()

  const [details, setDetails] = useState ([])

  useEffect(() => {
      console.log("task details id testi ", params.id);
      axios.get(`http://[::1]:3000/tasks/${params.id}`)
        .then(response => {
          console.log(response);
          setDetails(response.data)
          console.log("edit details testi", details);
        })
        .catch(error => {
          console.log(error);
        })
      
    }, [])

  const handlePickerChange = (newValue) => {
    // setValue(newValue);
  };



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
                    onChange={handlePickerChange}
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
                    onChange={handlePickerChange}
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

