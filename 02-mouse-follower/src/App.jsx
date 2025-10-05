
import { useEffect, useState } from 'react'
import './App.css'

const FollowMove = () => {

  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x:0, y:0})

  useEffect(() => {
    console.log('Enable: ', {enable})

    const handleMove = (event) => {
      const {clientX, clientY} = event;
      setPosition({ x: clientX, y: clientY})
      console.log('handleMovel', {clientX, clientY})
    }

    if (enable){
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      console.log("cleanup")
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top:-20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} />
      <button onClick={() =>setEnable(!enable)}> 
        {enable ? 'Desactivar' : 'Activar'} Seguir Puntero
      </button>
    </>
  )
}

function App() {
  return(
    <main>
      <FollowMove />
    </main>
  )
}

export default App
