import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TripsList from './TripsList.js';
import LoginForm from './LoginForm';
import TripForm from './TripForm';
import Signup from './SignupForm';
import ShowTrip from './ShowTrip';
import UpdateTrip from './UpdateTrip';
import CreateStop from './StopForm';
import ShowStop from './ShowStop';
import MainPage from './HomePage';

function App() {

  return (
      <BrowserRouter>
        <div>
          <Routes>
              <Route path='' element={<MainPage />} />
              <Route path='/trips' element={<TripsList />} />
              <Route path='/trips/:id' element={<ShowTrip />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<LoginForm/>} />
              <Route path='/trips/create' element={<TripForm/>} />
              <Route path='/trips/:id/update' element={<UpdateTrip/>} />
              <Route path='/trips/:id/stops/create' element={<CreateStop/>} />
              <Route path='/trips/:tripId/stops/:stopId' element={<ShowStop/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
