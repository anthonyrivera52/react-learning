import './app.css'
import { useCatFact } from './hooks/useCatFact'
import { Others } from './components/others'

export function App () {
  const { fact, refreshFact } = useCatFact()

  const handleLoading = async () => {
    refreshFact()
  }

  return (
    <main>
      <h3>
        App de Gatitos
      </h3>
      <button onClick={handleLoading}>Get New Fact</button>
      {fact && <p> {fact} </p>}
      <Others fact={fact} />
    </main>
  )
}
