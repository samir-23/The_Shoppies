import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//import logo from './logo.svg';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNominations';
import RemoveNominations from './components/RemoveNominations';

const App = () => {

  
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=7ab5847f`

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search){
      setMovies(responseJson.Search);
    }
    
  };


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieNominations = JSON.parse(localStorage.getItem('react-movie-app-nominations')
    );
    
    if (movieNominations) {
      setNominations(movieNominations);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-nominations', JSON.stringify(items))
  };


  const addNominationMovie = (movie) => {
    const newNominationList = [...nominations, movie]
    setNominations(newNominationList);
    saveToLocalStorage(newNominationList);

  };

  const removeNominationMovie = (movie) => {
    const newNominationList = nominations.filter
    (
      (nomination) => nomination.imdbID !== movie.imdbID
    );
    setNominations(newNominationList);

  }

  return (
    <div className = 'container-fluid movie-app'>
      <div className = 'row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = "The Shoppies"/>
        <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue}/>

      </div>
      <div className = 'row'>
        <MovieList 
        movies = {movies} 
        handleNominationsClick = {addNominationMovie} 
        nominateComponent = {AddNomination} 
        />
      </div>




      <div className = 'row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = "Nominations"/>
       

      </div>
      <div className = 'row'>
        <MovieList 
        movies = {nominations} 
        handleNominationsClick = {removeNominationMovie} 
        nominateComponent = {RemoveNominations} 
        />
      </div>  
      
   
    
    </div>
  );

  
    

};


export default App;
