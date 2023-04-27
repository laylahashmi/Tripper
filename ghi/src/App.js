import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TripsList from './TripForms/TripsList.js';
import LoginForm from './Login/LoginForm';
import TripForm from './TripForms/TripForm';
import Signup from './Signup/SignupForm';
import ShowTrip from './TripForms/ShowTrip';
import UpdateTrip from './TripForms/UpdateTrip';
import MainPage from "./MainPage";
import About from "./about";
import CreateStop from './StopForms/StopForm';
import ShowStop from './StopForms/ShowStop';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/trips" element={<TripsList />} />
          <Route path="/trips/:id" element={<ShowTrip />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/trips/create" element={<TripForm />} />
          <Route path="/trips/:id/update" element={<UpdateTrip />} />
              <Route path='/trips/:id/stops/create' element={<CreateStop/>} />
              <Route path='/trips/:tripId/stops/:stopId' element={<ShowStop/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
