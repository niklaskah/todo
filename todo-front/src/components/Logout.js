import React from "react"
import userService from "../services/UserService"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    userService.logout()
    const navigate = useNavigate()
    setTimeout(() => {
        navigate(`/signin`,  { replace: true })
    }, 5000)
    return (

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
              Uloskirjautuminen onnistui
            </Typography>

          </Box>
        </Container>
    )


}

export default Logout