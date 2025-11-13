import { createContext, useState } from 'react'


// Este es el que debemos consumir
// eslint-disable-next-line react-refresh/only-export-components
export const FiltersContext = createContext()

// Este es el que nos da acceso al contexto
export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  })

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      { children }
    </FiltersContext.Provider>
  )
}
