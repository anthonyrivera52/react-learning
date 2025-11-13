import './Filter.css'
import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'


export function Filters () {

    const minPriceFilterID = useId()
    const categoryFilterID = useId()

    const { filters, setFilters } = useFilters()

    const handleChangeMinPrice = (e) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }

    return (
        <section className='filters'>
            <div className="filter">
                <label htmlFor="price">Price to have:</label>
                <input 
                    id={`${minPriceFilterID}`} 
                    type="range" 
                    min="0"
                    max="1000"
                    value={filters.minPrice}
                    onChange={handleChangeMinPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <select 
                    id={`${categoryFilterID}`} 
                    onChange={handleChangeCategory}
                    >
                    <option value="all">Todas</option>
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                    <option value="groceries">Groceries</option>
                </select>
            </div>
        </section>
    )
}