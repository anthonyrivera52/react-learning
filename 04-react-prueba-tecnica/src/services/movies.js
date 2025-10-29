export const searchMovies = async ({ search }) => {

    if(search === '') return null;

    try{
        const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=8efcf529`)
        const json = await response.json();
        
        const movies = json.Search

        return movies?.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
        }))
    } catch(error) {
        console.log(error)
        throw new Error('Error al buscar películas')
    }
}