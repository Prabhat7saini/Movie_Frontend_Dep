
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { Grid, Typography } from '@mui/material';
import MovieCard from '../../component/common/MovieCard';
import { fetchFavMovie } from '../../services/operations/Moviesapi';
import { setFavMovie } from '../../redux/slices/movieSlice';
import { useEffect } from 'react';

const FavMovies = () => {

    const dispatch = useDispatch();

    const token:string=useSelector((state:RootState)=>state.auth.token) as string;
    useEffect(() => {
      const fetchAndDispatchMovies = async () => {
        try {
          const res = await fetchFavMovie(token);
          dispatch(setFavMovie(res?.data.favMovies));
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        }
      };
  
      fetchAndDispatchMovies();
    }, [dispatch]);
    const favMovie = useSelector((state: RootState) => state.movies.favMovie);
    // const Movies = useSelector((state: RootState) => state.movies.Movies)
    // console.log(useSelector((state:RootState)=>state.auth.currentUser))
    console.log(favMovie, "POIUY")
    return (
        <Grid container spacing={2} sx={{ marginTop: "5px" }}>
        {favMovie?.length! > 0 ? (
          favMovie?.map((ele, index) => (
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
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                    <Typography variant="h6" align="center">
                        You Don't Have Any Favorite Movie
                    </Typography>
                </Grid>
        )}
      </Grid>
    )
}

export default FavMovies
