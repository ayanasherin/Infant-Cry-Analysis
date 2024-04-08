import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Registration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import AudioUpload from './Pages/AudioUpload/AudioUpload';
import HealthcareM from './Pages/HealthcareM/HealthcareM';
import Exercise from './Pages/Exercise/Exercise';
import MentalHealth from './Pages/MentalHealth/MentalHealth';
import Tips from './Pages/Tips/Tips';
import Nutrition from './Pages/Nutrition/Nutrition';
import Profile from './Pages/Profile/Profile';
import UploadPage from './Pages/UploadPage/UploadPage';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/healthcare-m" element={<HealthcareM />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/mentalhealth" element={<MentalHealth />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/profile" element={<Profile />} />




      </Routes >
    </>
  )
}

export default App
