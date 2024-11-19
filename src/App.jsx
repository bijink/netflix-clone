import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import "./Assets/Fonts/fontAwesomeIcons";
import CategoryPage from "./Pages/CategoryPage";
import DetailsPage from "./Pages/DetailsPage";
import HomePage from "./Pages/HomePage";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Router>
            <Route exact path="/" children={<HomePage />} />
            <Route path="/details" children={<DetailsPage />} />
            <Route path="/category/:categoryID/:page" children={<CategoryPage />} />
         </Router>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

export default App;
