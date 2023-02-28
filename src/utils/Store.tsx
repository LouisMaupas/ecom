import React, {useState, createContext} from "react"

export const StoreContext = createContext(null)

export default ({children}) => {
    const [user, setUser] = useState(null),
        [items, setItems] = useState(null),
        [orders, setOrders] = useState(null);

    const store = {
        user: [user, setUser],
        items: [items, setItems],
        orders: [orders, setOrders],
    }

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}