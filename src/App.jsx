import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import Footer from './Components/Footer/Footer';
import { Trendings, Origins, Actions, RomanceMovies, ComedyMovies, HorrorMovies, ActionMovies, Documentaries } from './Urls';

function App() {
   return (
      <div>
         <NavBar />
         <Banner url={Trendings} />
         <RowPost title='Netfilx Origins' url={Origins} />
         <RowPost title='Action' url={Actions} isSmall />
         <RowPost title='Romance' url={RomanceMovies} />
         <RowPost title='Comedy' url={ComedyMovies} isSmall />
         <RowPost title='Horror' url={HorrorMovies} />
         <RowPost title='Documentary' url={Documentaries} isSmall />
         <Footer />
      </div>
   );
}

export default App;
