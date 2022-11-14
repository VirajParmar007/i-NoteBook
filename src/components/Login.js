import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';







export const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const [colorInput, setcolorInput] = useState('primary')
    let navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //will redirect to the page
            props.showAlert("Logged in", "success")
            localStorage.setItem("token", json.authToken)
            navigate("/")
        } else {
            props.showAlert("Invalid Email or Password", "error")
            setcolorInput("error")

        }
        
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    //Signup button navigation
    const navSignUp = () => {
        navigate("/signup")
    }


    //Password hide icon Material UI
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const showPassword = () => {
        let x = document.getElementById('password');
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <Container maxWidth="sm" style={{}}>

                <form>
                    <div className="mt-3">
                        <FormControl fullWidth color={colorInput}>
                            <InputLabel htmlFor="component-outlined">Email</InputLabel >
                            <OutlinedInput
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={onChange}
                                label="Email"
                                endAdornment={<InputAdornment position="end">
                                    <AccountCircle color='primary' />
                                </InputAdornment>}
                            />
                        </FormControl>

                    </div>
                    <div className="mt-3">
                        <FormControl fullWidth color={colorInput} >
                            <InputLabel htmlFor="component-outlined" >Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                name='password'
                                value={credentials.password}
                                onChange={onChange}
                                label="Password"
                                type='password'
                                endAdornment={<InputAdornment position="end">
                                    <IconButton color='primary'
                                        aria-label="toggle password visibility"
                                        onClick={showPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>}
                            />
                        </FormControl>
                    </div>

                    <Button onClick={handleLogin} variant="contained" color="success" sx={{ mt: 2 }}>Login</Button>
                    <Button onClick={navSignUp} size="small" color="primary" sx={{ mt: 2, paddingTop: 2, ml: 2 }}>Don't have account? Sign Up</Button>


                </form>
            </Container>
        </>
    )
}
