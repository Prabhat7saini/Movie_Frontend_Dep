import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState } from '../../redux/store';
import { Movie } from '../../utils/interface/types';
import { addCommnet, fetchMovies } from '../../services/operations/Moviesapi';
import Loader from './Loader';
import { setLoading } from '../../redux/slices/movieSlice';
import { toast } from 'react-toastify';

interface CommentFormInput {
    text: string;
    rating: string;
}

const MovieDetailCard: React.FC = () => {
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const token: string = useSelector((state: RootState) => state.auth.token) as string;
    const loading = useSelector((state: RootState) => state.movies.loading);
    const dispatch = useDispatch();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [text, setText] = useState<string>('');
    const [userRating, setUserRating] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null); // State for error message
    const { _id } = useParams<{ _id: string }>();

    const { register, handleSubmit, reset, setValue } = useForm<CommentFormInput>();

    const handleCommentSubmit: SubmitHandler<CommentFormInput> = async (formData) => {
        setError(null); // Reset error state on submit
        const { text, rating } = formData;

        // Validate comment and rating
        console.log(text,rating)
        if (!text || !rating) {
            setError('Both comment and rating are required.');
            return;
        }

        dispatch(setLoading(true));
        try {
            await addCommnet(token, _id!, text, rating);
            // Refresh the movie data after submitting the comment
            const moviesData = await fetchMovies();
            setMovies(moviesData);
        } catch (error) {
            console.error('Error submitting comment:', error);
            // toast.error(')
        } finally {
            setText('');
            setUserRating(null);
            dispatch(setLoading(false));
        }
        reset()
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const moviesData = await fetchMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch, _id]);

    const movie = movies.find((item) => item._id === _id);
    const commentArray = movie?.commentIds;

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        setUserRating(newValue);
        setValue('rating', newValue?.toString() || '');
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <img src={movie?.Poster} alt={movie?.Title} style={{ maxWidth: '100%' }} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h5" gutterBottom>
                                    {movie?.Title} ({movie?.Year})
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Rated:</strong> {movie?.Rated}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Released:</strong> {movie?.Released}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Runtime:</strong> {movie?.Runtime}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Genre:</strong> {movie?.Genre}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Director:</strong> {movie?.Director}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Writer:</strong> {movie?.Writer}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Actors:</strong> {movie?.Actors}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Plot:</strong> {movie?.Plot}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Language:</strong> {movie?.Language}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Country:</strong> {movie?.Country}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Awards:</strong> {movie?.Awards}
                                </Typography>

                                <Typography variant="h6" gutterBottom style={{ marginTop: '1rem' }}>
                                    Comments:
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Your Rating:</strong> {userRating !== null ? userRating : 'Not rated yet by Default 1'}
                                </Typography>



                                {currentUser && (
                                    <form onSubmit={handleSubmit(handleCommentSubmit)} style={{ marginTop: '1rem' }}>
                                        <TextField
                                            {...register('text', { required: true })}
                                            label="Add a comment"
                                            variant="outlined"
                                            fullWidth
                                            value={text}
                                            onChange={handleCommentChange}
                                        />
                                        <Rating
                                            value={userRating || 0}
                                            onChange={handleRatingChange}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            style={{ marginTop: '1rem' }}
                                        >
                                            Submit Comment
                                        </Button>
                                    </form>
                                )}
                                {error && (
                                    <Typography color="error" variant="body2" style={{ marginTop: '1rem' }}>
                                        {error}
                                    </Typography>
                                )}
                                {commentArray && commentArray.map((comment, index) => (
                                    <div key={index}>
                                        <h2 style={{ margin: '2rem' }}>Comment & Rating by</h2>
                                        <Typography variant="body1" style={{ margin: '2rem', whiteSpace: 'pre-line' }} gutterBottom>
                                            <strong>{comment.userId.name}:</strong>
                                            {'\n'}
                                            Commnet : {`${comment.text}`}
                                            {'\n'}
                                            Rating : {comment.rating}
                                        </Typography>
                                    </div>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default MovieDetailCard;
