import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchMoviesIfNeed, selectMovie } from '../actions/movie';
import Movies from '../components/movies';
import Movie from '../components/movie';

class Main extends Component {

    componentDidMount() {
        this.props.fetchMoviesIfNeed();
    }

    render() {
        const { movies, select_movie, clickHandle } = this.props
        const { isFetching, list, error } = movies;
        const { movie } = select_movie;
        const isEmpty = list.length === 0
        return (
            <div>
              { isFetching ? 'loading...' : '' }
              { error ? error : '' }
              { !isFetching && isEmpty ? 'no data' : '' }
              <Movies movies={list} clickHandle={clickHandle} />
              {movie && <Movie movie={movie} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { movies, select_movie } = state;
    return {
        movies,
        select_movie,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickHandle: (movie) => {
            dispatch(selectMovie(movie))
        },
        fetchMoviesIfNeed: () => dispatch(fetchMoviesIfNeed()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
