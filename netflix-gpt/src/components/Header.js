import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGO } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../store/userSlice';
import { toggleGptSearch } from '../store/gptSlice';
import { changeLanguage } from '../store/configSlice';
import languages from '../utils/languageConstants';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const showGptSearchPage = useSelector(store => store.gpt.showGptSearchPage);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
      return () => unsubscribe();
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(error => {
        navigate('/error');
      });
  };

  const handleGptView = () => {
    dispatch(toggleGptSearch());
  };

  const handleChangeLanguage = e => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex items-center p-2">
          {showGptSearchPage && (
            <select className="bg-black opacity-75 border border-white rounded-lg text-white p-2" onChange={handleChangeLanguage}>
              <optgroup>
                {Object.keys(languages).map(language => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </optgroup>
            </select>
          )}
          <button onClick={handleGptView} className="text-white bg-purple-700 rounded-lg px-4 p-2 mx-2">
            {!showGptSearchPage ? 'GPT Search' : 'Browse'}
          </button>
          <img className="w-12 h-12" src={user.photoURL} alt="usericon" />
          <button onClick={handleSignOut} className="text-white font-bold m-2">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
