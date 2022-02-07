import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MovieDetailsContext from './Store/MovieDetailsContext';
import VideoPopUpContext from './Store/VideoPopUpContext';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
   <React.StrictMode>
      <CookiesProvider>
         <VideoPopUpContext>
            <MovieDetailsContext>
               <App />
            </MovieDetailsContext>
         </VideoPopUpContext>
      </CookiesProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
