import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MovieDetailsContext from './Store/MovieDetailsContext';

ReactDOM.render(
   <React.StrictMode>
      <MovieDetailsContext>
         <App />
      </MovieDetailsContext>
   </React.StrictMode>,
   document.getElementById('root')
);