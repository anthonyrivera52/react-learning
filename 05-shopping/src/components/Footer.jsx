import './Footer.css'
import { IS_DEVELOPMENT } from '../config/config.js'
import { useFilters } from '../hooks/useFilters.js'
import { useCart } from '../hooks/useCart.js'



export function Footer () {
  const { filters } = useFilters()
  const { cart } = useCart()

  return (
    <footer className='footer'>
      { IS_DEVELOPMENT ? (
        <>
          <pre>{ JSON.stringify(filters, null, 2) }</pre>
          <pre>{ JSON.stringify(cart, null, 2) }</pre>
        </>
        ): <>
            <h4>Prueba técnica de React ⚛️ － <span>@innotechlabs</span></h4>
            <h5>Shopping Cart con useContext & useReducer</h5>
           </>
        }
    </footer>
  )
}