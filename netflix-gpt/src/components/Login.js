import { useRef, useState } from 'react';
import Header from './Header';
import { validateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { BANNER } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleButtonClick = () => {
    const message = validateData(emailRef.current.value, passwordRef.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign Up and Sign In Logic
    if (!isSignInForm) {
      // Sign Up User
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then(userCredential => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: 'https://avatars.githubusercontent.com/u/90269572?v=4',
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            })
            .catch(error => {});
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      // Sign In User
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then(userCredential => {
          const user = userCredential.user;
          // console.log(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
          navigate('/error');
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BANNER} alt="bgimage" />
      </div>
      <form
        onSubmit={e => e.preventDefault()}
        className="p-12 bg-black absolute w-3/12 mx-auto my-36 left-8 right-8 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-2">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="py-2 px-4 my-4 w-full bg-gray-800 
        rounded-md "
          />
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="py-2 px-4 my-4 w-full bg-gray-800 
        rounded-md "
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="py-2 px-4 my-4 w-full
         bg-gray-800   rounded-md"
        />
        <p className="font-bold text-red-500 py-2">{errorMessage}</p>
        <button onClick={handleButtonClick} className="py-2 my-4 bg-red-600 w-full rounded-md">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="py-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? 'New to Netflix? Sign up now.' : 'Already registered? Sign In now.'}
        </p>
      </form>
    </div>
  );
};

export default Login;
