import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField, Link, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import bg from './sports.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    border: '2px solid #4CAF50',
    width:"70%"
  },
  button: {
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #4CAF50 30%, #388E3C 90%)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  link: {
    color: '#4CAF50',
    cursor: 'pointer',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (username.trim() === '' || password.trim() === '') {
      // setError('Username and password are required');
      return;
    }

    const loginType = userType; 

    try {
      let loginEndpoint;
      if (loginType === 'admin') {
        loginEndpoint = '/api/auth/AdminLogin';
      } else if (loginType === 'seller') {
        loginEndpoint = '/api/auth/SellerLogin';
      } else if (loginType === 'user') {
        loginEndpoint = '/api/auth/Login';
      }
      const res = await axios.post(`http://localhost:8081${loginEndpoint}`, { email: username, password });
      console.log(res.data.message);
      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      alert(res.data.message)
      if (loginType === 'admin') {
        navigate('/AdminHome');
      } else if (loginType === 'seller') {
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/SellerHome")
      } else if (loginType === 'user') {
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/CustomerHome")
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error)
    }
  };

  const handleSignUp = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phone').value;

    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || phoneNumber.trim() === '') {
      // Handle validation or show error message
      return;
    }
    if (name.trim().length < 4) {
      alert('Name must be at least 4 characters long');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Phone number must be 10 digits');
      return;
    }

    try {
      let formData = { name, email, password, phoneNumber };
      const res = await axios.post(`http://localhost:8081/api/add/addusers`, formData);
      console.log(res.data.message);
      alert(res.data.message);
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error);
    }
  };

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h5">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Grid container spacing={2}>
            {isSignIn ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="user-type-label">Login As</InputLabel>
                    <Select
                      labelId="user-type-label"
                      id="user-type"
                      value={userType}
                      onChange={handleUserTypeChange}
                      label="Login As"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="seller">Seller</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Don't have an account? <Link className={classes.link} onClick={handleToggleForm}>Sign Up</Link>
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Already have an account? <Link className={classes.link} onClick={handleToggleForm}>Sign In</Link>
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
