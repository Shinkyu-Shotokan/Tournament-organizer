import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import download from 'downloadjs';


const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
