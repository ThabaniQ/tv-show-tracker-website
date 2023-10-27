import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetail';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import NotFound from './components/NotFound';
import Signout from './components/Signout';

function App() {
  return (
    <div className="app">
       <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/showlist" element={<ShowList />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/" element={<Welcome/>} />
          <Route path="*" element={<NotFound />} />
          <Route path='/signout' element={<Signout/>}/>
        </Routes>
    </div>
  );
}

export default App;
