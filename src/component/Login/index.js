import React from 'react';
import classes from './Login.module.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';

function Login() {

    const signIn = () => {
        auth.signInwithPopup(provider)
            .catch(error => alert(error.message))
    }

    return (
        <div className={classes.login}>
            <div className={classes.login__logo}>
                <img src="" alt="" />
                <h1>iMessage</h1>
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
