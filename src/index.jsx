import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MovieDetailsContext from './Store/MovieDetailsContext';
import VideoPopUpContext from './Store/VideoPopUpContext';

ReactDOM.render(
   <React.StrictMode>
      <VideoPopUpContext>
         <MovieDetailsContext>
            <App />
         </MovieDetailsContext>
      </VideoPopUpContext>
   </React.StrictMode>,
   document.getElementById('root')
);