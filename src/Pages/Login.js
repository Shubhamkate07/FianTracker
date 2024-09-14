import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import RegbackGroundImgL from "../img/mobile-expense-management-abstract-illustration_335657-4984.avif"
import { useNavigate, Link } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const emailChangedHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangedHandler = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return; 

        setIsLoading(true);
        const loginData = {
            email: email,
            password: password,
        };

        try {
            await addLoginData(loginData);
            setEmail('');
            setPassword('');
            navigate('/db');
        } catch (error) {
            console.error('Submission error:', error);
            alert('Login failed. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    async function addLoginData(loginData) {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC42844vo45bTWRHyiPEk5m-_7LsoPWjBc',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: loginData.email, 
                        password: loginData.password, 
                        returnSecureToken: true,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = 'Login failed.';
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                alert(errorMessage);
                throw new Error(errorMessage);
            }

            const lg_data = await response.json();
            console.log('Login successful:', lg_data);
            navigate('/home'); 
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    return (
        <Container maxWidth="sm" >
            <Box   
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                    minHeight: '100vh',
 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    padding: 4,
                }}
            >
                <Paper style={{height:'500px'}}
                    sx={{
                        padding: 4,
                        width: '100%',
                        maxWidth: 500,
                        borderRadius: 8,
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)', 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backgroundImage: `url(${RegbackGroundImgL})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'left',
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                        backgroundImage: 'url(https://i.pinimg.com/originals/c1/15/2f/c1152fa316589887d0cf52bf70422a4b.jpg)'
                    }}
                >

                    <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            color: '#333',
                            fontSize: '3rem', 
                            letterSpacing: '0.5px', 
                            textTransform: 'uppercase', 
                            marginBottom: 2, 
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
                        }}
                    >
                        Login here
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={emailChangedHandler}
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
                                '& .MuiFormHelperText-root': {
                                    color: '#d32f2f', 
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={passwordChangedHandler}
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
                                '& .MuiFormHelperText-root': {
                                    color: '#d32f2f', 
                                },
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </form>
                    <Typography
                        variant="body1"
                        align="center"
                        underline="hover" 
                        sx={{ mt: 4, color: '#333', fontWeight: 'bold' }}
                    >
                        Don't have an account?{' '}
                        <Link component={RouterLink} to="/register" style={{color:'red', fontSize:'17px'}}>
                            Register
                        </Link>
                        <br />
                    </Typography>
                    
                </Paper>
            </Box>
        </Container>
    )
}

export default Login


// import React, { useState } from 'react';
// import { Container, Paper, Typography, Box, TextField, Button, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     setLoading(true);

//     try {
//       const response = await authenticateUser(credentials);
//       if (response.success) {
//         navigate('/dashboard');
//       } else {
//         alert('Invalid login credentials.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to log in.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const authenticateUser = async ({ email, password }) => {
//     const response = await fetch(
//       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC42844vo45bTWRHyiPEk5m-_7LsoPWjBc',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, returnSecureToken: true }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Login error response:', errorData);
//       throw new Error(errorData.message || 'Login request failed');
//     }

//     const data = await response.json();
//     return data;
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="105vh"
//       >
//         <Paper
//           sx={{
//             padding: '2rem',
//             width: '100%',
//             backgroundImage: 'url(https://i.pinimg.com/originals/c1/15/2f/c1152fa316589887d0cf52bf70422a4b.jpg)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             borderRadius: 6,
//           }}
//         >
//           <Typography variant="h5" align="center" gutterBottom>
//             Sign In
//           </Typography>

//           <Box sx={{ mt: 2 }}>
//             <form onSubmit={handleFormSubmit}>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Email"
//                 name="email"
//                 value={credentials.email}
//                 onChange={handleInputChange}
//                 required
//                 sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
//               />
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Password"
//                 type="password"
//                 name="password"
//                 value={credentials.password}
//                 onChange={handleInputChange}
//                 required
//                 sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
//               />
//               <Box mt={3}>
//                 <Button
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={loading}
//                 >
//                   {loading ? 'Logging in...' : 'Login'}
//                 </Button>
//               </Box>
//             </form>
//           </Box>

//           <Box mt={2} textAlign="center">
//             <Typography variant="body2">
//               Don't have an account?{' '}
//               <Link href="/register" color="primary" style={{ color: 'red', fontSize: '17px' }}>
//                 Register here
//               </Link>
//             </Typography>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
