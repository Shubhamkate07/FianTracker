import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography, Paper } from '@mui/material';

function SavingsGoals({ currentBalance }) {
  const [goal, setGoal] = useState(10000);
  const [saved, setSaved] = useState(3000); 
  const [error, setError] = useState('');

  const handleGoalChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setGoal(value);
      setError('');
    } else {
      setError('Goal must be a positive number.');
    }
  };

  const handleSavedChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= goal) {
      setSaved(value);
      setError('');
    } else if (value > goal) {
      setError('Saved amount cannot exceed the goal.');
    } else {
      setError('Saved amount must be a positive number.');
    }
  };

  const progress = (saved / goal) * 100;

  return (
    <Paper
      sx={{
        maxWidth: 450,
        margin: '0 auto',
        mt: 6,
        p: 4,
        borderRadius: 3,
        boxShadow: 6,
        background: 'linear-gradient(145deg, #f3e7e9, #e3edf7)', 
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: '#3c3c3c',
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Savings Goals
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#3c3c3c',
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        {`Current Balance: ₹${(currentBalance || 0).toLocaleString()}`}
      </Typography>
      <TextField
        label="Savings Goal"
        type="number"
        value={goal}
        onChange={handleGoalChange}
        fullWidth
        sx={{
          mb: 2,
          '& .MuiInputBase-input': { fontWeight: 'bold' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#b39ddb' },
            '&:hover fieldset': { borderColor: '#9575cd' },
            '&.Mui-focused fieldset': { borderColor: '#7e57c2' },
          },
        }}
        error={Boolean(error)}
        helperText={error}
      />
      <TextField
        label="Amount Saved"
        type="number"
        value={saved}
        onChange={handleSavedChange}
        fullWidth
        sx={{
          mb: 3,
          '& .MuiInputBase-input': { fontWeight: 'bold' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#b39ddb' },
            '&:hover fieldset': { borderColor: '#9575cd' },
            '&.Mui-focused fieldset': { borderColor: '#7e57c2' },
          },
        }}
        error={Boolean(error)}
        helperText={error}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={120}
          thickness={5}
          sx={{
            color: progress < 50 ? '#ff7043' : progress < 75 ? '#ffa726' : '#66bb6a',
            transition: 'color 0.5s ease',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))',
          }}
        />
      </Box>
      <Typography
        variant="body1"
        textAlign="center"
        sx={{
          fontWeight: 'bold',
          color: '#3c3c3c',
          mb: 2,
        }}
      >
        {`Progress: ${progress.toFixed(2)}%`}
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          background: 'linear-gradient(90deg, #7e57c2, #9575cd)',
          boxShadow: '0px 4px 20px rgba(126, 87, 194, 0.5)',
          '&:hover': { background: 'linear-gradient(90deg, #9575cd, #7e57c2)' },
        }}
        onClick={() => alert('Goal updated!')} 
        disabled={Boolean(error)} 
      >
        Update Goal
      </Button>
    </Paper>
  );
}

export default SavingsGoals;
