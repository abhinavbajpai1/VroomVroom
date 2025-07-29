import { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './Authentication/Register';
import Login from './Authentication/Login';

import './App.css'

function App() {
useEffect(() => {
  axios.get('http://localhost:8000').then((res) => {
    console.log(res.data);
  })
},[]);


return (
    <>
    {
      1==1 ? <Login /> : <Register />
    }

      
    </>
  )
}

export default App;
