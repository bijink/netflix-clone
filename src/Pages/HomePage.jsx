import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner/Banner';
import Footer from '../Components/Footer/Footer';
import NavBar from '../Components/NavBar/NavBar';
import RowPost from '../Components/RowPost/RowPost';
import { Trendings, Origins, Actions, RomanceMovies, ComedyMovies, HorrorMovies, Documentaries } from '../Urls';

const HomePage = () => {


   return (
      <div>
         <NavBar />
         <Banner url={Trendings} />
         <RowPost title='Netfilx Origins' url={Origins} />
         <RowPost title='Trendings' url={Trendings} isSmall />
         <RowPost title='Action' url={Actions} />
         <RowPost title='Romance' url={RomanceMovies} isSmall />
         <RowPost title='Comedy' url={ComedyMovies} />
         <RowPost title='Horror' url={HorrorMovies} isSmall />
         <RowPost title='Documentary' url={Documentaries} />
         <Footer />
      </div>
   );
};

export default HomePage;
