import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
// import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import InfoPopup from '../InfoPopup/InfoPopup';
import ProtectedRoute from '../ProtectedRoute';
import Api from '../../utils/api';
import * as auth from '../../utils/auth';
import { BASE_URL } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

function App() {
  const location = useLocation();
  const budgetPage = location.pathname === '/budgets';
  const history = useHistory();
  const [token, setToken] = React.useState(() => localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [duplicateUser, setDuplicateUser] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: "Yosemite", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"});
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [infoMessage, setInfoMessage] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isServerError, setServerError] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isSuccessPopup, setSuccessPopup] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [wrongInputs, setWrongInputs] = React.useState(false);
  const [values, setValues] = React.useState({email: '', password: '', username: ''});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const api = new Api({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  });

  const handleFormReset = React.useCallback(
    (
      newValues = {email: '', password: '', username: ''},
      newErrors = {email: '', password: '', username: ''},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function inputsValidation() {
    const formText = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    setErrors((state) => ({
      ...state,
      email: formText.test(values.email) ? "" : "Please enter a valid email!"
    }));
  }

 function handleFormChange(evt) {
   const {name, value} = evt.target
   const newValues = { ...values, [name]: value }

    setValues(newValues);
    inputsValidation(newValues);
    setErrors({...errors, [name]: errors[name] });
    setIsValid(evt.target.closest('form').checkValidity());
  }

  function formSwitch(e) {
    e.preventDefault();
    handleFormReset()

    if(isRegisterPopupOpen) {
      handleLoginClick()
      setRegisterPopupOpen(false)
    } else if(isLoginPopupOpen) {
      handleRegisterClick()
      setLoginPopupOpen(false)
    } else {
      handleLoginClick()
      setSuccessPopup(false)
    }
  }

  //Registration
  function handleRegisterClick() {
    setRegisterPopupOpen(true);
    setLoginPopupOpen(false);
    setWrongInputs(false);
  }
  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if(!res || res.status === 400 || res.status === 409) {
          throw new Error('Error signup!')
        } else if(res.status === 200 || 201) {
          return res.json();
        }
      })
      .then(() => {
        setIsSuccess(true);
        toggleToolTip();
        setInfoMessage("Success! You have now been registered.");
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        setInfoMessage("Oops, something went wrong! Please try again.");
      });
  }

  //Login
  function handleLoginClick() {
    setLoginPopupOpen(true);
    setRegisterPopupOpen(false);
    setSuccessPopup(false);
  }
  function handleLogin(email, password) {
    if(!email || !password) return;

    auth.authorize(email, password)
    .then((data) => {
      if (!data) {
        setIsSuccess(false);
        toggleToolTip();
        setInfoMessage("Oops, something went wrong! Please try again.");
        history.push('/signin'); // needed ???
      }

      toggleToolTip()
      setInfoMessage("Success! You are now logged in.");
      setPassword('');
      setIsSuccess(true);
      setIsLoggedIn(true);
      setEmail(email);
      setToken(localStorage.getItem('jwt'));
      history.push('/');
    })
    .catch(err => console.log(err));
  }

  //Signout
  // function handleSignoutClick() {
  //   unSavedArticles();
  //   handleSignOut();
  // }
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setToken('');
    setIsLoggedIn(false);
    setEmail('');
    history.push('/signin');
  }

  function toggleToolTip() {
    setInfoTooltip(!isInfoTooltip);
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const res = isLiked ? api.removeCardLike(card.id) : api.addCardLike(card.id);

    res.then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c.id === card.id ? null : c);
      // Update the state
      setCards(newCards);
    }).catch(err => console.log(err));
  }
  function closeAllPopups() {
    setInfoTooltip(false);
  }
  function handlePopupClose(evt) {
    if(evt.target !== evt.currentTarget) return;

    closeAllPopups();
  }

  // function handleAddNewCard({name, link}) {
  //   api.addCard({name, link})
  //     .then((newCard) => setCards([transformCard(newCard), ...cards]) )
  //     .then(() => setAddNewCardPopup(false))
  //     .catch(err => console.log(err));
  // }
  function handleCardDelete(card) {
    api.removeCard(card.id)
      .then(() => {
        const cardsCopy = cards.filter((item) => item.id !== card.id);
        setCards(cardsCopy);
      })
      .catch(err => console.log(err));
  }
  function saveRessources(card) {

  }

  //collect user's informations
  React.useEffect(() => {
    if(token) {
      auth.getContent(token)
        .then((res) => {
          if(res) {
            setIsLoggedIn(true);
            setIsSuccess(true);
            setEmail(email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));

      api.getAppInfo()
        .then(([userInfo, initialCards]) =>{
          setCurrentUser(userInfo.data);
          // setCards(
          //   initialCards.map(transformCard)
          // );
        })
        .catch(err => console.log(err));

    }
  }, [token]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/'>
          <Header
            isLoggedIn={isLoggedIn}
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
            handlePopupClose={handlePopupClose}
          />

          <Main
            isLoggedIn={isLoggedIn}
            budgetPage={budgetPage}
          />
        </Route>

        <ProtectedRoute exact path='/budgets'
          isLoggedIn={isLoggedIn}
          email={currentUser.email}
          handleSignOut={handleSignOut}
          handlePopupClose={handlePopupClose}
          onDeleteClick={(card) => handleCardDelete(card)}
          onLikeClick={(card) => handleCardLike(card)}
          onSave={(card) => saveRessources(card)}
        />

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>

      <Footer />

      <RegisterForm
        duplicateUser={duplicateUser}
        values={values}
        errors={errors}
        isValid={isValid}
        wrongInputs={wrongInputs}
        isOpen={isRegisterPopupOpen}
        onClose={handlePopupClose}
        onSwicth={formSwitch}
        handleRegister={handleRegister}
        handleFormChange={handleFormChange}
      />

      <LoginForm
        values={values}
        errors={errors}
        isValid={isValid}
        wrongInputs={wrongInputs}
        isOpen={isLoginPopupOpen}
        onClose={handlePopupClose}
        onSwicth={formSwitch}
        handleLogin={handleLogin}
        handleFormChange={handleFormChange}
      />

      <InfoPopup
        isOpen={isSuccessPopup}
        onClose={handlePopupClose}
        onSwitch={formSwitch}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
