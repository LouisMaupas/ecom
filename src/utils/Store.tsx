import React, {useState, createContext} from "react"

export const StoreContext = createContext(null)

export default ({children}) => {
    const [userFireStore, setUserFireStore] = useState(null),
        [userECom, setUserECom] = useState(null),
        [items, setItems] = useState(null),
        [cart, setCart] = useState([]),
        [orders, setOrders] = useState(null);

    const store = {
        cart: [cart, setCart],
        userFireStore: [userFireStore, setUserFireStore],
        userECom: [userECom, setUserECom],
        items: [items, setItems],
        orders: [orders, setOrders],
    }

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}