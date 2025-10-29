const ListMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {
        movies.map(movie => {
          return (
            <li className="movie" key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.title} />
            </li>
          )
        })
      }
    </ul>
  )
}

const NotMovies = ({ error }) => {
  return (
    <p style={{ color: 'red' }}>{error || 'No se encontraron películas'}</p>
  )
}

export function Movies({ movies, error }) {
  return movies?.length > 0 ? (
        <ListMovies movies={movies} />
    ) : (
        <NotMovies error={error} />
    )
}
