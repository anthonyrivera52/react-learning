import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useCustomHook ({ search, sort }) {
  const [responseMovie, setResponseMovie] = useState([])
  const previewSearch = useRef(search)

  // Memoize the getMovie function to avoid re-creation on every render
  // const getMovie = useMemo(() => {
  //   return async ({search}) => {
  //     if (previewSearch.current === search) return
  //     previewSearch.current = search
  //     const newMovies = await searchMovies({ search })
  //     setResponseMovie(newMovies)
  //   }
  // }, [])

  // useCallback using to function 
  // and same as useMemo
  const getMovie = useCallback(async ({search}) => {
    if (previewSearch.current === search) return
    previewSearch.current = search
    const newMovies = await searchMovies({ search })
    setResponseMovie(newMovies)
  }, [])

  // const sortedMovies = sort 
  // ? [...responseMovie].sort((a, b) => a.title.localeCompare(b.title))
  // : responseMovie

  const sortedMovies = useMemo(() => {
    return sort 
    ? [...responseMovie].sort((a, b) => a.title.localeCompare(b.title))
    : responseMovie
  }, [sort, responseMovie])

  return { movies: sortedMovies, getMovie }

}

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current) {
      isFirstInput.current = search === ""
      return
    }

    if(search === '') {
      setError('No se puede buscar una película sin nombre')
      return
    }

    if(search.match(/\d+$/)) {
      setError('No se puede buscar una película por número')
      return
    }

    if(search.length < 3) {
      setError('El nombre de la película debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}