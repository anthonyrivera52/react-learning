import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/fact'

export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(setFact)
  }

  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
