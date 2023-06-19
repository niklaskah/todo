import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'

export default function FloatingActionAddButton() {
  const navigate = useNavigate()
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add" onClick={() => navigate("/tasks/add",  { replace: true })}>
        <AddIcon />
      </Fab>
    </Box>
  );
}