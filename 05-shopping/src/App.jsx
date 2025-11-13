import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import './App.css'
import { useState } from 'react'
import { Headers } from './components/Headers.jsx'
import { Footer } from './components/Footer.jsx'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'


function App() {
  
  const [products] = useState(initialProducts)
  const { filteredProducts } = useFilters()

  const filterProducts = filteredProducts(products)

  return (
    <CartProvider>
      <Headers />
      <Cart />
      <Products products={filterProducts} />
      <Footer />
    </CartProvider>
  )
}

export default App
