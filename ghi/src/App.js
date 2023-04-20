import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorNotification from './ErrorNotification';
import './App.css';
import TripsList from './TripsList.js';
import LoginForm from './LoginForm';
import TripForm from './TripForm';
import Signup from './SignupForm';
import ShowTrip from './ShowTrip';
import UpdateTrip from './UpdateTrip';

function App() {

  return (
      <BrowserRouter>
        <div>
          <Routes>
              <Route path='/trips' element={<TripsList />} />
              <Route path='/trips/:id' element={<ShowTrip />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<LoginForm/>} />
              <Route path='/trips/create' element={<TripForm/>} />
              <Route path='/trips/:id/update' element={<UpdateTrip/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
