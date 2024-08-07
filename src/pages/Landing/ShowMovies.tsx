import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Grid } from '@mui/material';
import MovieCard from '../../component/common/MovieCard';

import {  useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Loader from '../../component/common/Loader';

const ShowMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  const Movies=useSelector((state:RootState)=>state.movies.Movies);
  
  // const token: string = useSelector((state: RootState) => state.auth.token) as string 
  const loading=useSelector((state:RootState)=>state.movies.loading)
 
  useEffect(() => {
 
    setMovies(Movies);
  }, [Movies]);
 

  return (
    loading ?(<Loader/>):( <Grid container spacing={2} sx={{ marginTop: "5px" }}>
      {movies.length > 0 ? (
        movies.map((ele, index) => (
          <Grid key={index} item xs={12}>
            <MovieCard
              Title={ele.Title}
              Poster={ele.Poster}
              Ratings={ele.Ratings[1].Value}
              Plot={ele.Plot}
              Year={ele.Year}
              _id={ele._id}
            />
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>)
   
  );
};

export default ShowMovies;
