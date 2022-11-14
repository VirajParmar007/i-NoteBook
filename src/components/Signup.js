import { AccountCircle, PersonAdd, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';




export const Signup = (props) => {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cnfrmPass: "" })

    let navigate = useNavigate()


    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!credentials.email) { props.showAlert("Invalid Email", "error") }

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //will redirect to the page
            props.showAlert("Account created succesfully", "success")
            localStorage.setItem("token", json.authToken)

            navigate("/")
        } else {
            props.showAlert("Invalid credentials", "error")
            // setcolorInput("error")

        }
    }
    // Password helper text
    const [passhelper, setpasshelper] = useState("")


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
        if (credentials.password.length < 6) { setpasshelper("Password should be minimum 6 character") }
        else if (credentials.password.length > 6) { setpasshelper("Strength: Good") }
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
                        <FormControl fullWidth color="primary" required>
                            <InputLabel htmlFor="component-outlined">Enter your name</InputLabel >
                            <OutlinedInput
                                id="name"
                                name="name"
                                value={credentials.name}
                                onChange={onChange}
                                label="Enter your name"
                                endAdornment={<InputAdornment position="end">
                                    <AccountCircle color='primary' />
                                </InputAdornment>}
                            />
                        </FormControl>
                    </div>
                    <div className="mt-3">
                        <FormControl fullWidth color="primary" required>
                            <InputLabel htmlFor="component-outlined">Enter a valid email</InputLabel >
                            <OutlinedInput
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={onChange}
                                label="Enter a valid email"
                                endAdornment={<InputAdornment position="end">
                                    <AccountCircle color='primary' />
                                </InputAdornment>}
                            />

                        </FormControl>
                    </div>
                    <div className="mt-3" style={{ height: "78px" }}>
                        <FormControl minLength={6} fullWidth color={credentials.password.length < 6 ? 'error' : 'success'} >
                            <InputLabel htmlFor="component-outlined" >Set password</InputLabel>
                            <OutlinedInput
                                id="password"
                                name='password'
                                value={credentials.password}
                                onChange={onChange}
                                label="Set password"
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
                                aria-describedby="outlined-weight-helper-text"

                            />
                            <FormHelperText id="outlined-weight-helper-text">{passhelper}</FormHelperText>
                        </FormControl>
                    </div>

                    <div className="mt-2" style={{ height: "78px" }}>
                        <FormControl minLength={6} fullWidth color={credentials.password === credentials.cnfrmPass ? "primary" : "error"} >
                            <InputLabel htmlFor="component-outlined" >Confirm password</InputLabel>
                            <OutlinedInput
                                id="cnfrmPass"
                                name='cnfrmPass'
                                value={credentials.cnfrmPass}
                                onChange={onChange}
                                label="Confirm password"
                                type='password'
                                aria-describedby="outlined-weight-helper-text"
                                endAdornment={<InputAdornment position="end">
                                    {credentials.password === credentials.cnfrmPass ? "" : <WarningOutlinedIcon color='error' />}

                                </InputAdornment>}
                            />
                            <FormHelperText color='error' id="outlined-weight-helper-text">{credentials.password === credentials.cnfrmPass ? "" : "Password does not match"}</FormHelperText>
                        </FormControl>
                    </div>

                    <Button type="submit" onClick={handleSignUp} variant="contained" color="success" sx={{ mt: 8, display: "flex", margin: "auto" }}><PersonAdd fontSize="small" />&nbsp;Sign Up</Button>
                </form>
            </Container>
        </>
    )
}

