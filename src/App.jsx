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
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<AudioUpload />} />
        <Route path="/healthcare-m" element={<HealthcareM/>} />
        <Route path="/exercise" element={<Exercise/>} />
        <Route path="/mentalhealth" element={<MentalHealth/>} />
        <Route path="/tips" element={<Tips/>} />
        <Route path="/nutrition" element={<Nutrition/>} />



      </Routes >
    </>
  )
}

export default App
