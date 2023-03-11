import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import AddNewJob from './pages/AddNewJob/AddNewJob';
import EditJob from './pages/EditJob/EditJob';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-new-job' element={<AddNewJob />} />
          <Route path='/edit-job' element={<EditJob />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
