import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';

import FormPost from './components/FormPost.jsx';
import PostsList from './components/PostsList.jsx';
import AuthorProfile from './components/AuthorProfil.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={
          <>
            <Home />
            <PostsList />
            
            <FormPost /> 
          </>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/authorprofil' element={<AuthorProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
