import React, { useState } from 'react';
import styled from 'styled-components';
import { SendRounded, ImageOutlined, LocationOnOutlined, ArrowBackIosRounded, CallRounded } from '@material-ui/icons';
// import socketIOClient from 'socket.io-client';
// import axios from 'axios';

const Chat = styled.div`
    padding: 0 32px;
`

const Navbar = styled.div`
    border-bottom: solid 1.5px #383838;
    margin: 0 -32px;
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu-text {
        font-size: 18px;
        font-weight: 500;
    }
    svg {
        border-radius: 50px;
        padding: 16px;
        box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
        font-size: 2rem;
        cursor : pointer;
    }
`

const Message = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 32px;
    .image {
        width: 60px;
        border-radius: 60px;
    }
    .message-body {
        margin: 0 16px;
    }
    .username {
        margin-bottom: 8px;
        color: #fff9;
    }
    .my-username {
        text-align: right;
    }
    .message {
        padding: 16px 24px;
        max-width: 250px;
        background: linear-gradient(135deg, rgba(227,50,81,1) 35%, rgba(245,88,105,1) 100%);
        border-radius: 24px 24px 24px 0;
    }
    .my-message {
        background: none;
        border-radius: 24px 24px 0 24px;
        box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
    }
    .message-time {
        font-weight: 500;
        color: #ffffff42;
        margin-right: auto;
    }
    .my-message-time {
        margin-left: auto;
        margin-right: 0;
    }
`

const ChatText = styled.div`
    display: flex;
    align-items: center;
    margin-left: -32px;
    margin-right: -32px;
    padding: 16px 32px;
    border-top: solid 1px #ffffff2b;
    position: absolute;
    bottom: 0;
    z-index: 99;
    input {
        width: 100%;
        background: none;
        border: none;
        font-family: inherit;
        font-size: 18px;
        padding: 16px 6px;
        color: #fff;
    }
    svg {
        font-size: 2rem;
        margin-left: 16px;
    }
    .send-btn {
        background: linear-gradient(135deg, rgba(227,50,81,1) 35%, rgba(245,88,105,1) 100%);
        border-radius: 25px;
        padding: 12px 16px;
        padding-left: 20px;
        margin-left: 24px;
        font-size: 1.8rem;
    }
`

const MessageCard = ({ userImage, username, message, messageTime, isMyMessage }) => {
    return (
        <>
            {(!isMyMessage) ?
                <Message>
                    <img className="image" src={userImage} alt="User" />
                    <div className="message-body">
                        <div className="username">{username}</div>
                        <div className="message">{message}</div>
                    </div>
                    <div className="message-time">{messageTime}</div>
                </Message>
                :
                <Message>
                    <div className="message-time my-message-time">{messageTime}</div>
                    <div className="message-body">
                        <div className="my-username username">{username}</div>
                        <div className="message my-message">{message}</div>
                    </div>
                    <img className="image my-image" src={userImage} alt="User" />
                </Message>
            }
        </>
    )
}

export default () => {
    const [chatText, setChatText] = useState('')
    // const endpoint = "http://localhost:8080";
    // const [messages, setMessages] = useState([])
    // const [user, setUser] = useState('')
    return (
        <Chat>
            <Navbar>
                <ArrowBackIosRounded onClick={() => {
                    //close socket

                    //back to group
                    window.location.assign("/group")
                }} />
                <div className="menu-text">
                    Starlink Con.
                </div>
                <CallRounded />
            </Navbar>
            <br /><br />
            <MessageCard
                userImage={'/man.png'}
                username={'Daidew'}
                message={'Hi, John Doe'}
                messageTime={'12.15'}
                isMyMessage={false}
            />

            <MessageCard
                userImage={'/dummy.jpg'}
                username={'Bankbiz'}
                message={'Hi, Bruno Mars'}
                messageTime={'14.15'}
                isMyMessage={true}
            />

            <MessageCard
                userImage={'/dummy.jpg'}
                username={'Nai_Two'}
                message={'Hi, John Doe'}
                messageTime={'12.25'}
                isMyMessage={false}
            />

            <ChatText>
                <input
                    type="text"
                    value={chatText}
                    onChange={e => setChatText(e.target.value)}
                    placeholder='Type your message'
                />
                <ImageOutlined style={{ color: '#ffffff82' }} />
                <LocationOnOutlined style={{ color: '#ffffff82' }} />
                <SendRounded className="send-btn" />
            </ChatText>
        </Chat>
    )
}