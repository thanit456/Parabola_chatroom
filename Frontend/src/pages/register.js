import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tada from 'react-reveal/Tada';

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

const Register = styled.div`
    padding: 0 32px;
    color: #fff;
    h1 {
        color: #F55869;
    }
    .background {
        text-align: right;
    }
    form {
        margin-bottom: 56px;
    }
    .register-btn {
        text-decoration: none;
        background-color: #22222a;
        box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
        color: #bababa;
        padding: 16px 186px;
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
        align-items: center;
        margin-top: 48px;
    }
    .register-text a {
        text-decoration: none;
        color: #f558698a;
    }
`

export default () => {
    const [username, setUsername] = useState(''); //TO DO
    const [userImage, setUserImage] = useState(''); //TO DO
    const [password, setPassword] = useState(''); //TO DO

    const [passwordAgain, setPasswordAgain] = useState('');

    const onClickRegister = () => {
        if (password === passwordAgain) {
            setPassword(password);
        } else {
            alert('Please fill your password correctly');
        }
    }

    const classes = useStyles();

    return (
        <Register>
            <br />
            <h1 className="title">Register</h1>
            <p>please fill form correctly</p>
            <div className="background">
                <Tada>
                    <img width="60%" src="/bg-signup.svg" alt="Sign up" />
                </Tada>
            </div>
            <br /><br />
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="standard"
                    label="Your username"
                    InputProps={{
                        className: classes.input
                    }}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <br /><br /><br />
                <TextField
                    fullWidth
                    id="standard"
                    label="Profile Image Url"
                    InputProps={{
                        className: classes.input
                    }}
                    value={userImage}
                    onChange={e => setUserImage(e.target.value)}
                />
                <br /><br /><br />
                <TextField
                    fullWidth
                    id="standard"
                    label="Your password"
                    InputProps={{
                        className: classes.input
                    }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br /><br /><br />
                <TextField
                    fullWidth
                    id="standard"
                    label="Fill password again"
                    InputProps={{
                        className: classes.input
                    }}
                    value={passwordAgain}
                    onChange={e => setPasswordAgain(e.target.value)}
                />
            </form>
            <div className="button">
                <Link onClick={onClickRegister} className="register-btn" to="/group">Sign up</Link>
            </div>
            <div className="register-text">
                <p>Already be a member?</p>
                <Link to="/">Sign in</Link>
            </div>
            <p className="copyright">© Parabola Inc.</p>
        </Register>
    )
}