import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Pulse from 'react-reveal/Pulse';
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

const Popup = styled.div`
    border-radius: 24px;
    background-color: #22222A;
    position: absolute;
    width: 380px;
    height: 300px;
    left: 50%;
    top: 25%;
    margin-left: -230px;
    padding: 40px;
    box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
    .create-group-heading {
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        color: rgb(244, 85, 103);
    }
    .btn-create-group {
        width: fit-content;
        margin: auto;
        background-color: #22222a;
        box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
        color: #bababa;
        padding: 16px 136px;
        border-radius: 50px;
    }
`

export default (props) => {
    const [groupName, setGroupName] = useState(''); //TO DO
    const [groupImage, setGroupImage] = useState(''); //TO DO
    const endpoint = "http://localhost:8080";
    const classes = useStyles();
    const PopupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (PopupRef.current && !PopupRef.current.contains(event.target)) {
                props.setIsOpenCreateGroup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [PopupRef]);

    return (
        <Pulse>
            <Popup ref={PopupRef}>
                <div className="create-group-heading">
                    Create Group
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        id="standard"
                        label="Group Name"
                        InputProps={{
                            className: classes.input
                        }}
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                    />
                    <br /><br /><br />
                    <TextField
                        fullWidth
                        id="standard"
                        label="Cover Image Url"
                        InputProps={{
                            className: classes.input
                        }}
                        value={groupImage}
                        onChange={e => setGroupImage(e.target.value)}
                    />
                </form>
                <div
                    onClick={() => {
                        let payload = {
                            "roomname" : groupName,
                            "roomimage" : groupImage
                        }
                        axios.post(endpoint+"/createroom",payload,{withCredentials: true}).then(res => {
                            console.log(res)
                        })
                        props.setIsOpenCreateGroup(false)
                        window.location.assign('/group')
                    }}
                    className="btn-create-group"
                >
                    Create Group
            </div>
            </Popup>
        </Pulse>
    )
}