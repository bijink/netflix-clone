import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import { trendings, origins, actions } from './Urls';

function App() {
   return (
      <div>
         <NavBar />
         <Banner url={trendings} />
         <RowPost title='Netfilx Origins' url={origins} />
         <RowPost title='Actions' url={actions} isSmall />
      </div>
   );
}

export default App;
