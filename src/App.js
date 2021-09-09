import classes from './App.module.css';
import { selectUser, login, logout } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import IMessage from './component/IMessage'
import Login from './component/Login';
import { useEffect } from 'react';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChange(authUser => {
      if (authUser) {
        // user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }));
      } else {
        // user is logged out
        dispatch(logout())
      }
    })
  }, [])
  return (
    <div className={classes.app}>
      {user ? <IMessage /> :
        <Login />
      }
    </div>
  );
}

export default App;
