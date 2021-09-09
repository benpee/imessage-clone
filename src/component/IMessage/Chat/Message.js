import React, { forwardRef } from 'react';
import classes from './Message.module.css';
import { Avatar } from '@material-ui/core';
import { selectUser } from '../../../features/userSlice';
import useSelector from 'react-redux';
import * as timeago from 'timeago.js'

// npm i -S react-flip-move
// npm i moment.js for timing

const Message = forwardRef(
    (
        { id, content: {
            timestamp, displayName, message, photo, uid, email
        } },
        ref) => {
        const user = useSelector(selectUser)
        return (
            <div ref={ref} className={`${classes.message}${user.email === email && classes.message__sender}`}>
                <Avatar src={photo} className={classes.message__photo} />
                <p>{message}</p>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
                <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
            </div>
        )
    });

export default Message
