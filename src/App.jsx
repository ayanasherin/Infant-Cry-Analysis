import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Registration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import AudioUpload from './Pages/AudioUpload/AudioUpload';
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<AudioUpload />} />

      </Routes >
    </>
  )
}

export default App
