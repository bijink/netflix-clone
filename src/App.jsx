import React from 'react';
import './App.css';
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar';
import RowPost from './Components/RowPost/RowPost';
import { origins, actions } from './Urls';

function App() {
   return (
      <div>
         <NavBar />
         <Banner />
         <RowPost title='Netfilx Origins' url={origins} />
         <RowPost title='Actions' url={actions} isSmall />
      </div>
   );
}

export default App;
