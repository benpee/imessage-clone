import React, { useState, useEffect } from 'react';
import classes from './Chat.module.css';
import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import db from '../../../firebase';
import { selectChatId, selectChatName } from 'features/chatSlice';
import { useSelector } from 'react-redux';
import Message from './Message';
import firebase from 'firebase';
import { selectUser } from '../../../features/userSlice';
import FlipMove from 'react-flip-move'

function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);

    useEffect(() => {
        if (chatId) {
            db.collection("chats")
                .doc(chatId)
                .collection('messages')
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot => {
                    setMessages(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        }))
                    )
                })
        }
    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.fieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photoURL,
                email: user.email,
                displayName: user.displayName
            })
        setInput("");
    }
    return (
        <div className={classes.chat}>
            <div className={classes.chat__header}>
                <h4>To: <span className={classes.chat__name}>{chatName}</span></h4>
                <strong>Details</strong>
            </div>

            <div className={classes.chat__messages}>
                <FlipMove>
                    {messages.map(({ id, data }) => (
                        <Message key={id} id={id} data={data()} />
                    ))
                    }
                </FlipMove>
            </div>

            <div className={classes.chat__input}>
                <form>
                    <input
                        type="text"
                        value={input}
                        placeholder="Send message"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
