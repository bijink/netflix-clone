import React from 'react';
import Footer from '../Components/Footer/Footer';
import MovieDetails from '../Components/MovieDetails/MovieDetails';
import NavBar from '../Components/NavBar/NavBar';

const DetailsPage = () => {
   return (
      <div>
         <NavBar />
         <MovieDetails />
         <Footer />
      </div>
   );
};

export default DetailsPage;
