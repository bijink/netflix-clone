import React from "react";
import "./Assets/Fonts/fontAwesomeIcons";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import CategoryPage from "./Pages/CategoryPage";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Router>
            <Route exact path="/" children={<HomePage />} />
            <Route path="/details" children={<DetailsPage />} />
            <Route path="/category/:categoryID" children={<CategoryPage />} />
         </Router>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

export default App;
