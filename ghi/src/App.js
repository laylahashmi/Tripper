import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorNotification from './ErrorNotification';
import './App.css';
import TripsList from './TripsList.js';
import LoginForm from './LoginForm';
import TripForm from './TripForm';

function App() {

  return (
      <BrowserRouter>
        <div>
          <Routes>
              <Route path='/trips' element={<TripsList />} />
              <Route path='/login' element={<LoginForm/>} />
              <Route path='/trips/create' element={<TripForm/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
