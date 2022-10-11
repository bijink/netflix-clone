import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";

function App() {
   return (
      <div>
         <Router>
            <Route exact path="/">
               <HomePage />
            </Route>
            <Route path="/details">
               <DetailsPage />
            </Route>
         </Router>
      </div>
   );
}

export default App;
