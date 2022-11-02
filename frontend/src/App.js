import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Teams from './pages/team';
import SignUp from './pages/signup';
  
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/team' element={<Teams />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/api' element={<Link to={{ pathname: 'https://www.themealdb.com/'}}/> }/>
      </Routes>
    </Router>
  );
}
  
export default App;