import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./components/common/listGroup";
import { getGenres } from "./services/fakeGenreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./components/searchBox";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPageData = () => {
    const {
      selectedGenre,
      movies,
      sortColumn,
      pageSize,
      searchQuery,
      currentPage,
    } = this.state;

    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movie = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movie };
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (movies.length === 0)
      return <p className="m-3">There are no movies in the database</p>;

    const { totalCount, data } = this.getPageData();
    return (
      <React.Fragment>
        <main className="container">
          <div className="row">
            <div className="col-3 m-2">
              <ListGroup
                genres={genres}
                onItemSelect={this.handleGenreSelect}
                selectedGenre={selectedGenre}
              />
            </div>
            <div className="col">
              <Link
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
                to="/movies/new"
              >
                New movie
              </Link>

              <p className="m-3">Showing {totalCount} movies in the database</p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <MoviesTable
                movies={data}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />

              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Movies;
