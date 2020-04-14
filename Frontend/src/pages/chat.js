import React from 'react';
import styled from 'styled-components';
import { ArrowBackIosRounded, CallRounded } from '@material-ui/icons';

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
    .message {
        margin: 0 16px;
        padding: 16px 24px;
        max-width: 250px;
        background: linear-gradient(135deg, rgba(227,50,81,1) 35%, rgba(245,88,105,1) 100%);
        border-radius: 24px 24px 24px 0;
    }
    .my-message {
        background: none;
        border-radius: 24px 24px 0 24px;
        box-shadow: 7px 7px 21px #131317, 
        -7px -7px 21px #31313d;
    }
    .message-time {
        font-weight: 500;
        color: #cfcfcf;
        margin-right: auto;
    }
    .my-message-time {
        margin-left: auto;
        margin-right: 0;
    }
`

const MessageCard = ({ userImage, message, messageTime, isMyMessage }) => {
    return (
        <>
            {(!isMyMessage) ?
                <Message>
                    <img className="image" src={userImage} alt="User" />
                    <div className="message">
                        {message}
                    </div>
                    <div className="message-time">
                        {messageTime}
                    </div>
                </Message>
                :
                <Message>
                    <div className="message-time my-message-time">
                        {messageTime}
                    </div>
                    <div className="message my-message">
                        {message}
                    </div>
                    <img className="image my-image" src={userImage} alt="User" />
                </Message>
            }
        </>
    )
}

export default () => {
    return (
        <Chat>
            <Navbar>
                <ArrowBackIosRounded />
                <div className="menu-text">
                    Starlink Con.
                </div>
                <CallRounded />
            </Navbar>
            <br /><br />
            <MessageCard
                userImage={'/man.png'}
                message={'Hi, John Doe'}
                messageTime={'12.15'}
                isMyMessage={false}
            />

            <MessageCard
                userImage={'/dummy.jpg'}
                message={'Hi, Bruno Mars'}
                messageTime={'14.15'}
                isMyMessage={true}
            />

        </Chat>
    )
}