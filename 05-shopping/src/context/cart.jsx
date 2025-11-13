import { useReducer } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext()

const initState = []
const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action

    switch(actionType) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload
            // check if product exist in the cart
            const productExistIndex = state.findIndex(item => item.id === id)

            if (productExistIndex >= 0) {
                // forma usando structuredClone
                const newState = structuredClone(state)
                // update the quantity
                newState[productExistIndex].quantity += 1
                return newState
            }

            return [
                    ...state,
                    { ...actionPayload, quantity: 1 }
                ]
        }
        case 'REMOVE_FROM_CART': {
            const { id } = actionPayload
            return state.filter(item => item.id !== id)
        }

        case 'CLEAR_CART': {
            return initState
        }

        default:
            return state
    }
}

export function CartProvider ({ children }) {
    const [state, dispatch] = useReducer(reducer, initState)
    
    return (
        <CartContext.Provider value={{
            cart : state,
            addToCart: product => dispatch({ type: 'ADD_TO_CART', payload: product }),
            removeFromCart: product => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
            clearCart: () => dispatch({ type: 'CLEAR_CART' }),
         }}>
            {children}
        </CartContext.Provider>
    )
}
