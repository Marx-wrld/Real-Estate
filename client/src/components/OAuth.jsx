import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import  { app } from "../firebase";
import { useDispatch }  from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch(); //Frontend
  const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            provider.setCustomParameters({ prompt: 'select_account' }); //This custom parameter enables Google Auth to always popup when the button is clicked even when only one user is signed in. It allows the user select the account on the pop up before creating a new user or signing in an existing user.

            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            })
            //After getting the result we convert it to json and store it inside data
            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("Could not sign in with Google!",)
        }
    }
  return (
    <button onClick={handleGoogleClick} type="button" className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with Google</button>
  )
}

export default OAuth