import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ExitToAppRounded, PlaylistAddRounded, SearchRounded } from '@material-ui/icons';
import CreateGroup from '../features/createGroup';
import axios from 'axios';

const Group = styled.div`
    padding: 0 32px;
    .icon-search {
        position: absolute;
        border-radius: 50px;
        font-size: 2.4rem;
        padding: 24px;
        box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
        bottom: 5%;
        margin-left: 340px;
    }
    form {
        margin-top: 32px;
        margin-bottom: 56px;
    }
`

const Navbar = styled.div`
    border-bottom: solid 1.5px #383838;
    margin: 0 -32px;
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        text-decoration: none;
        color: #fff;
    }
    .menu-text {
        font-size: 18px;
        font-weight: 500;
    }
    svg {
        background: linear-gradient(145deg, #24242d, #1f1f26);
        border-radius: 50px;
        padding: 16px;
        box-shadow: 5px 5px 10px #19191f, 
        -5px -5px 10px #2b2b35;
        font-size: 2rem;
    }
`

const EachGroup = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 24px 0 8px 0;
    .group-image img {
        border-radius: 80px;
        width: 80px;
    }
    .group-name {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 8px;
    }
    .message {
        color: #cecece;
    }
    .time {
        font-weight: 500;
        color: #b0b0b0;
    }
    .left {
        margin-right: 32px;
    }
    .center {
        margin-right: auto;
    }
`

const GroupCard = ({ groupImage, groupName, lastMessage, lastMessageTime }) => {
    return (
        <EachGroup>
            <div className="left">
                <div className="group-image">
                    <img src={groupImage} alt="" />
                </div>
                <div className="noti-status"></div>
            </div>
            <div className="center">
                <div className="group-name">
                    {groupName}
                </div>
                <div className="message">
                    {lastMessage}
                </div>
            </div>
            <div className="time">
                {lastMessageTime}
            </div>
        </EachGroup>
    )
}

export default () => {
    const endpoint = "http://localhost:8080";
    const [rooms,setRooms] = useState([]);
    const [isOpenCreateGroup, setIsOpenCreateGroup] = useState(false);
    axios.get(endpoint+"/whoami").then(res => {
        console.log(res)
    })
    // axios.get(endpoint+"/getallroom", { data: { user :  } }).then(res => {
    //     console.log(res)
    //     setRooms(res.data)
    // })
    return (
        <Group>
            <Navbar>
                <PlaylistAddRounded onClick={() => setIsOpenCreateGroup(true)} />
                <div className="menu-text">
                    Groups
                </div>
                <Link to="/">
                    <ExitToAppRounded />
                </Link>
            </Navbar>

            {(isOpenCreateGroup) ?
                <CreateGroup
                    isOpenCreateGroup={isOpenCreateGroup}
                    setIsOpenCreateGroup={setIsOpenCreateGroup}
                />
                : null
            }

            <GroupCard
                groupImage={'/man.png'}
                groupName={'Starlink Con.'}
                lastMessage={'Hi, Can you say something...'}
                lastMessageTime={'12.15'}
            />
            <GroupCard
                groupImage={'/man.png'}
                groupName={'Starlink Con.'}
                lastMessage={'Hi, Can you say something...'}
                lastMessageTime={'12.15'}
            />
            <GroupCard
                groupImage={'/man.png'}
                groupName={'Starlink Con.'}
                lastMessage={'Hi, Can you say something...'}
                lastMessageTime={'12.15'}
            />

            <SearchRounded style={{ color: '#F45567' }} className='icon-search' />
        </Group>
    )
}