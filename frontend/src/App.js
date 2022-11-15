import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './constants';
import Home from './pages/Home';
import About from './pages/About';
import Teams from './pages/Team';
import SignUp from './pages/Signup';
import RecipeView from './components/RecipeView';


function App() {
  const [user, setUser] = React.useState({});
  const [searchParams, setSearchParams] = React.useState("name");

  return (
    <AppContext.Provider value={{ user, setUser, searchParams, setSearchParams}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/team' element={<Teams />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/api' element={<Link to={{ pathname: 'https://www.themealdb.com/'}}/> }/>
          <Route path='/recipe/:id' element={<RecipeView />} />
          <Route path='/create' element={<About />} />
          <Route path='/fridget' element={<About />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
  
export default App;