import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import Artists from './components/Artist';
import IndividualArtist from './components/IndividualArtist';
import Venues from './components/Venues';
import IndividualVenue from './components/IndividualVenue';
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )}
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/artists' exact={true}>
            <Artists />
          </Route>
          <Route path='/artists/:artistId' exact={true} >
            <IndividualArtist />
          </Route>
          <Route path='/venues' exact={true}>
            <Venues />
          </Route>
          <Route path='/venues/:venueId' exact={true}>
            <IndividualVenue />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
