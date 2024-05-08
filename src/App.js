import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharactersList from './components/CharactersList';
import CharacterDetail from './components/CharacterDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<CharactersList />} />
        <Route path='/character/:id' element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;