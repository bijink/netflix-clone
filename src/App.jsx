import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DetailsPage from './Pages/DetailsPage';

function App() {
   return (
      <div>
         <Router>
            <Route exact path='/' >
               <HomePage />
            </Route>
            <Route path='/detail' >
               <DetailsPage />
            </Route>
         </Router>
      </div>
   );
}

export default App;
