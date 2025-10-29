import './App.css'
import { useState, useCallback } from 'react'
import { Movies } from './components/movies.jsx'
import { useCustomHook, useSearch } from './hooks/useMovies.js'
import debounce from 'just-debounce-it'

function App() {

  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovie } = useCustomHook({ search, sort })
  // const [query, setQuery] = useState('')
  // const inputRef = useRef(null)

  const debounceGetMovie = useCallback(
    debounce(search => {
      getMovie({search})
    }, 300), 
    [getMovie]
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    // const fields = new window.FormData(e.target)
    // const name = fields.get('name')
    // const { query } =  Object.fromEntries(new window.FormData(e.target))
    // const name = inputRef.current.value
    if(search === '') {
      error('Por favor, ingresa un nombre de película')
      return
    }
    getMovie({search})
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    updateSearch(newSearch)
    debounceGetMovie(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }


  return (
    <div className='page'>
      <header>
        <h1>
          Prueba Tecnica
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" id="query" name="query" placeholder="Put the movie name" />
          <input type="checkbox" checked={sort} onChange={handleSort} />
          <button type="submit">Buscar</button>
        </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} error={error} />
      </main>
    </div>
  )
}

export default App
