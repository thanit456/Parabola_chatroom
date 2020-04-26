import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RubberBand from 'react-reveal/RubberBand';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& label': {
            color: '#757575',
        },
        '& label.Mui-focused': {
            color: '#E43350',
        },
        '& .MuiInput-underline:hover': {
            borderBottomColor: '#808080',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#E5E5E5',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#E43350',
        },
    },
    input: {
        color: 'white',
        fontSize: '20px',
    }
}))

const Login = styled.div`
    padding: 0 32px;
    color: #fff;
    .title {
        font-family: 'Baloo Paaji 2', cursive;
        font-size: 48px;
        font-weight: 500;
        padding-top: 32px;
        background: linear-gradient(to right, #E43350 , #F45769);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0;
    }
    p {
        margin-top: 0;
        color: #A9A9B5;
    }
    .background {
        width: 300px;
        margin-left: auto;
    }
    form {
        margin-top: 72px;
        margin-bottom: 56px;
    }
    .login-btn {
        text-decoration: none;
        background-color: #22222a;
        box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
        color: #bababa;
        padding: 16px 190px;
        border-radius: 50px;
    }
    .copyright {
        font-size: 12px;
        text-align: center;
        padding-top: 64px;
        color: #ffffff4f;
    }
    .register-text {
        display: flex;
        justify-content: space-between;
        margin-top: 48px;
    }
    .register-text a {
        text-decoration: none;
        color: #f558698a;
    }
`

export default () => {
    const [userName, setUserName] = useState(''); //TO DO
    const [userPassword, setUserPassword] = useState(''); //TO DO
    const endpoint = "http://localhost:8080";
    const classes = useStyles();

    return (
        <Login>
            <h1 className="title">Parabola</h1>
            <p>chat application</p>
            <div className="background">
                <RubberBand>
                    <img src="/bg-login.svg" alt="Login" />
                </RubberBand>
            </div>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="standard"
                    label="Your username"
                    InputProps={{
                        className: classes.input
                    }}
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <br /><br /><br />
                <TextField
                    fullWidth
                    id="standard"
                    label="Your password"
                    InputProps={{
                        className: classes.input
                    }}
                    value={userPassword}
                    onChange={e => setUserPassword(e.target.value)}
                />
            </form>
            <div className="button">
                <Link className="login-btn" onClick={()=>{
                    let payload={
                        "username" : userName,
                        "password" : userPassword
                    }
                    axios.post(endpoint+"/login",payload,{withCredentials: true}).then(res => {
                        //console.log(res.headers)
                        window.location.assign('/group')
                    })
                }} >Sign in</Link>
            </div>
            <div className="register-text">
                <p>Not a member yet?</p>
                <Link to="/register">Sign up</Link>
            </div>
            <p className="copyright">© Parabola Inc.</p>
        </Login>
    )
}