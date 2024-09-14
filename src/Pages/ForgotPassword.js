import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate password reset process
    setTimeout(() => {
      alert(`Password reset link sent to ${email}`);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 8,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 2,
            }}
          >
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              sx={{
                '& .MuiInputLabel-root': {
                  fontWeight: 'bold',
                  color: '#333',
                },
                '& .MuiOutlinedInput-root': {
                  borderColor: '#4a90e2',
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#1a73e8',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a73e8',
                  },
                },
                '& .MuiInputBase-input': {
                  fontWeight: 'bold',
                  color: '#333',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
