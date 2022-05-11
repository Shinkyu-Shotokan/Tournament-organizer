import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import EditApplicant from './EditApplicant';
import AddStudent from './AddStudent';
import download from 'downloadjs';


const App = () => {

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editApplicant/:id" element={<EditApplicant />} />
          <Route path="/addApplicant" element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
