import React, { useEffect, useState } from 'react';
import classes from './Sidebar.module.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import db, { auth } from '../../../firebase';
import { selectUser } from '../../../features/userSlice';



function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    });

    const addChannel = () => {
        const newChatName = prompt('Please enter a chat name');

        if (newChatName) {
            db.collection('chat').addChannel({
                chatName: newChatName
            })
        } else { return; }
    }

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar__header}>
                <Avatar
                    src={user.photo}
                    className={classes.sidebar__avatar}
                    onClick={() => auth.signOut()}
                />
                <div className={classes.sidebar__input}>
                    <SearchIcon />
                    <input placeholder="Search" />

                    <IconButton variant="outlined" className={classes.sidebar__inputButton}>
                        <RateReviewOutlinedIcon onClick={addChannel} />
                    </IconButton>
                </div>
            </div>
            <div className={classes.sidebar__chat}>
                {/* <SidebarChat /> */}
                {chats.map(({ id, data: { chatName } }) => (
                    <SidebarChat key={id} chatName={chatName} id={id} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
